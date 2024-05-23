# file contains utility functions to interact with the database. It includes functions 1. show_cocktails_from_picked_ingredients to fetch cocktails based on selected ingredients and 2.  get_cocktail_details to retrieve details of a specific cocktail. These functions are used by app.py to handle database operations.

import mysql.connector
from config import HOST, USER, PASSWORD

class DBConnectionError(Exception):
    pass

def _connect_to_db(db_name: str):
    connection = mysql.connector.connect(
        host=HOST,
        user=USER,
        password=PASSWORD,
        auth_plugin='mysql_native_password',
        database=db_name
    )
    return connection

def show_cocktails_from_picked_ingredients(selected_ingredients):
    if len(selected_ingredients) > 15:
        raise ValueError("A maximum of 15 ingredients can be selected")

    db_connection = None
    cocktails = []
    try:
        db_name = 'cocktaildb'
        db_connection = _connect_to_db(db_name)
        cursor = db_connection.cursor()
        print("Connected to DB successfully")

        # Construct the WHERE clause dynamically with placeholders
        conditions = ' AND '.join([f"{ingredient_placeholder} IN (ing.ingredient1, ing.ingredient2, ing.ingredient3, ing.ingredient4, ing.ingredient5, ing.ingredient6, ing.ingredient7, ing.ingredient8, ing.ingredient9, ing.ingredient10, ing.ingredient11, ing.ingredient12, ing.ingredient13, ing.ingredient14, ing.ingredient15)" for ingredient_placeholder in ['%s'] * len(selected_ingredients)])

        query = f"""
        SELECT DISTINCT cn.name
        FROM cocktail_names cn
        JOIN ingredients ing ON cn.id = ing.cocktail_id
        WHERE {conditions}
        GROUP BY cn.name
        ORDER BY cn.name;
        """

        print("SQL Query:", query)

        cursor.execute(query, selected_ingredients)
        results = cursor.fetchall()

        cocktails = [{'name': row[0]} for row in results] if results else []
        print("Fetched results:", cocktails)

    except Exception as e:
        raise DBConnectionError(f"Failed to read from database: {e}")
    finally:
        if db_connection:
            db_connection.close()
            print("DB connection closed")

    if not cocktails:
        print("No cocktail with this combination of ingredients.")
    
    return cocktails

def get_cocktail_details(cocktail_name):
    db_connection = None
    details = {}
    try:
        db_name = 'cocktaildb'
        db_connection = _connect_to_db(db_name)
        cursor = db_connection.cursor(dictionary=True)
        print("Connected to DB successfully")
        
        # Fetch ingredients
        query_ingredients = """
        SELECT * FROM ingredients ing
        JOIN cocktail_names cn ON cn.id = ing.cocktail_id
        WHERE cn.name = %s;
        """
        cursor.execute(query_ingredients, (cocktail_name,))
        ingredient_row = cursor.fetchone()

        # Process ingredients
        ingredients = []
        for key, value in ingredient_row.items():
            if key.startswith('ingredient') and value is not None:
                ingredients.append(value)

        # Now, 'ingredients' contains all the ingredients as a list

        # Fetch instructions
        query_instructions = """
        SELECT instructions FROM instructions inst
        JOIN cocktail_names cn ON cn.id = inst.cocktail_id
        WHERE cn.name = %s;
        """
        cursor.execute(query_instructions, (cocktail_name,))
        instructions = cursor.fetchone()
        
        # Fetch image URL
        query_image = """
        SELECT image_url FROM images img
        JOIN cocktail_names cn ON cn.id = img.cocktail_id
        WHERE cn.name = %s;
        """
        cursor.execute(query_image, (cocktail_name,))
        image_url = cursor.fetchone()
        
        # Fetch video URL
        query_video = """
        SELECT video_url FROM videos vid
        JOIN cocktail_names cn ON cn.id = vid.cocktail_id
        WHERE cn.name = %s;
        """
        cursor.execute(query_video, (cocktail_name,))
        video_url = cursor.fetchone()
        
        details['ingredients'] = ingredients
        details['instructions'] = instructions
        details['image_url'] = image_url
        details['video_url'] = video_url

    except Exception as e:
        raise DBConnectionError(f"Failed to read from database: {e}")
    finally:
        if db_connection:
            db_connection.close()
            print("DB connection closed")

    return details


"""fetch('http://127.0.0.1:5000/cocktails', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ ingredients: ['vodka', 'orange juice'] })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
"""

"""Go to http://127.0.0.1:5000/ in browser. 'Hello World' should appear."""