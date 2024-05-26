# this file shows how utils could be OOP. I have tried to implement this but i need to look more into the errors. 

import mysql.connector
from config import HOST, USER, PASSWORD

class DBConnectionError(Exception):
    pass

class CocktailDB:
    def __init__(self, db_name='cocktaildb'):
        self.db_name = db_name
        self.connection = None
        self.cursor = None
        self._connect_to_db()

    def _connect_to_db(self):
        try:
            self.connection = mysql.connector.connect(
                host=HOST,
                user=USER,
                password=PASSWORD,
                auth_plugin='mysql_native_password',
                database=self.db_name
            )
            self.cursor = self.connection.cursor(dictionary=True)
            print("Connected to DB successfully")
        except mysql.connector.Error as err:
            raise DBConnectionError(f"Error connecting to database: {err}")

    def close_db(self):
        if self.connection:
            self.connection.close()
            print("DB connection closed")

    def get_ingredients(self):
        ingredients = []
        try:
            query = """
            SELECT DISTINCT ingredient1 FROM ingredients
            UNION SELECT DISTINCT ingredient2 FROM ingredients
            UNION SELECT DISTINCT ingredient3 FROM ingredients
            UNION SELECT DISTINCT ingredient4 FROM ingredients
            UNION SELECT DISTINCT ingredient5 FROM ingredients
            UNION SELECT DISTINCT ingredient6 FROM ingredients
            UNION SELECT DISTINCT ingredient7 FROM ingredients
            UNION SELECT DISTINCT ingredient8 FROM ingredients
            UNION SELECT DISTINCT ingredient9 FROM ingredients
            UNION SELECT DISTINCT ingredient10 FROM ingredients
            UNION SELECT DISTINCT ingredient11 FROM ingredients
            UNION SELECT DISTINCT ingredient12 FROM ingredients
            UNION SELECT DISTINCT ingredient13 FROM ingredients
            UNION SELECT DISTINCT ingredient14 FROM ingredients
            UNION SELECT DISTINCT ingredient15 FROM ingredients
            ORDER BY ingredient1;
            """
            self.cursor.execute(query)
            results = self.cursor.fetchall()
            ingredients = [row['ingredient1'] for row in results if row['ingredient1']]
            print("Fetched ingredients:", ingredients)
        except mysql.connector.Error as err:
            raise DBConnectionError(f"Failed to read from database: {err}")
        return ingredients

    def show_cocktails_from_ingredients(self, selected_ingredients):
        if len(selected_ingredients) > 15:
            raise ValueError("A maximum of 15 ingredients can be selected")

        cocktails = []
        try:
            # Construct the WHERE clause dynamically with placeholders
            conditions = ' AND '.join(
                [f"{ingredient_placeholder} IN (ing.ingredient1, ing.ingredient2, ing.ingredient3, ing.ingredient4, ing.ingredient5, ing.ingredient6, ing.ingredient7, ing.ingredient8, ing.ingredient9, ing.ingredient10, ing.ingredient11, ing.ingredient12, ing.ingredient13, ing.ingredient14, ing.ingredient15)" 
                 for ingredient_placeholder in ['%s'] * len(selected_ingredients)]
            )

            query = f"""
            SELECT DISTINCT cn.name
            FROM cocktail_names cn
            JOIN ingredients ing ON cn.id = ing.cocktail_id
            WHERE {conditions}
            GROUP BY cn.name
            ORDER BY cn.name;
            """

            print("SQL Query:", query)
            self.cursor.execute(query, selected_ingredients)
            results = self.cursor.fetchall()

            cocktails = [{'name': row['name']} for row in results] if results else []
            print("Fetched results:", cocktails)
        except mysql.connector.Error as err:
            raise DBConnectionError(f"Failed to read from database: {err}")

        if not cocktails:
            print("No cocktail with this combination of ingredients.")
        
        return cocktails

    def get_cocktail_details(self, cocktail_name):
        details = {}
        try:
            # Fetch ingredients
            query_ingredients = """
            SELECT * FROM ingredients ing
            JOIN cocktail_names cn ON cn.id = ing.cocktail_id
            WHERE cn.name = %s;
            """
            self.cursor.execute(query_ingredients, (cocktail_name,))
            ingredient_row = self.cursor.fetchone()

            # Process ingredients
            ingredients = []
            for key, value in ingredient_row.items():
                if key.startswith('ingredient') and value:
                    ingredients.append(value)

            # Fetch instructions
            query_instructions = """
            SELECT instructions FROM instructions inst
            JOIN cocktail_names cn ON cn.id = inst.cocktail_id
            WHERE cn.name = %s;
            """
            self.cursor.execute(query_instructions, (cocktail_name,))
            instructions = self.cursor.fetchone()

            # Fetch image URL
            query_image = """
            SELECT image_url FROM images img
            JOIN cocktail_names cn ON cn.id = img.cocktail_id
            WHERE cn.name = %s;
            """
            self.cursor.execute(query_image, (cocktail_name,))
            image_url = self.cursor.fetchone()

            # Fetch video URL
            query_video = """
            SELECT video_url FROM videos vid
            JOIN cocktail_names cn ON cn.id = vid.cocktail_id
            WHERE cn.name = %s;
            """
            self.cursor.execute(query_video, (cocktail_name,))
            video_url = self.cursor.fetchone()

            details['ingredients'] = ingredients
            details['instructions'] = instructions['instructions'] if instructions else None
            details['image_url'] = image_url['image_url'] if image_url else None
            details['video_url'] = video_url['video_url'] if video_url else None
        except mysql.connector.Error as err:
            raise DBConnectionError(f"Failed to read from database: {err}")

        return details

