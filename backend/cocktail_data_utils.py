import requests
import mysql.connector
from config import HOST, USER, PASSWORD

# this populates the tables with data from the mySQL.txt it is not used by the frontend,. 
# I wanted to use the data in the cocktailsdb online to populate this database so i could use both one i created and the online database to satisfy both of these requirements. However, the online APIs don't let you get specific ingredients (without paying) or all the cocktails. They do, However, allow you to get cocktails by letter. So I had the idea to loop trhough all the letters and get the data that way!

db_name = "cocktaildb"


class CocktailDB:
    def __init__(self, db_name):
        self.connection = mysql.connector.connect(
            host=HOST,
            user=USER,
            password=PASSWORD,
            auth_plugin='mysql_native_password',
            database=db_name
        )
        self.cursor = self.connection.cursor()

    # Function to fetch cocktails by first letter
    def fetch_cocktails_by_letter(self, letter):
        url = f"https://www.thecocktaildb.com/api/json/v1/1/search.php?f={letter}"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()["drinks"] if "drinks" in response.json() else []
        else:
            print(f"Error fetching cocktails for letter {letter}: {response.status_code}")
            return []

     # Function to fetch all cocktails
    # loope through alphabet and fetch them all with the free API
    # now we need to work out how ro parse them and add them to the database
    def fetch_all_cocktails(self):
        all_cocktails = []
        # the loop is here 
        for letter in "abcdefghijklmnopqrstuvwxyz":
            cocktails = self.fetch_cocktails_by_letter(letter)
            if cocktails:
                all_cocktails.extend(cocktails)
        return all_cocktails

    # inserts into the database here 
    def insert_cocktail_data(self, data):
        for cocktail in data:
            print(f"Inserting data for cocktail: {cocktail['strDrink']}")
            self.cursor.execute("INSERT INTO cocktail_names (id, name) VALUES (%s, %s)",
                                (cocktail["idDrink"], cocktail["strDrink"]))
            print(f"Inserted data into cocktail_names table for cocktail: {cocktail['strDrink']}")
            # ingredients table
            ingredients = [cocktail[f"strIngredient{i}"] for i in range(1, 16) if cocktail.get(f"strIngredient{i}")]
            self.cursor.execute("INSERT INTO ingredients (cocktail_id, " + ", ".join(
                [f"ingredient{i}" for i in range(1, len(ingredients) + 1)]) + ") VALUES (%s, " + ", ".join(
                ["%s"] * len(ingredients)) + ")", tuple([cocktail["idDrink"]] + ingredients))
            print(f"Inserted data into ingredients table for cocktail: {cocktail['strDrink']}")

            self.cursor.execute("INSERT INTO instructions (cocktail_id, instructions) VALUES (%s, %s)",
                                (cocktail["idDrink"], cocktail["strInstructions"]))
            print(f"Inserted data into instructions table for cocktail: {cocktail['strDrink']}")

            self.cursor.execute("INSERT INTO images (cocktail_id, image_url) VALUES (%s, %s)",
                                (cocktail["idDrink"], cocktail["strDrinkThumb"]))
            print(f"Inserted data into images table for cocktail: {cocktail['strDrink']}")

            # videos
            self.cursor.execute("INSERT INTO videos (cocktail_id, video_url) VALUES (%s, %s)",
                                (cocktail["idDrink"], cocktail["strVideo"]))
            print(f"Inserted data into videos table for cocktail: {cocktail['strDrink']}")
            # drinks information - need to edit
            self.cursor.execute(
                "INSERT INTO drinks_information (id, category, type, dateModified) VALUES (%s, %s, %s, %s)",
                (cocktail["idDrink"], cocktail["strCategory"], cocktail["strAlcoholic"], cocktail["dateModified"]))
            print(f"Inserted data into drinks_information table for cocktail: {cocktail['strDrink']}")
            self.connection.commit()

            # glass_type table
            glass_type = cocktail.get("strGlass")
            if glass_type:
                self.cursor.execute("INSERT INTO glass_type (cocktail_id, glass) VALUES (%s, %s)",
                                    (cocktail["idDrink"], glass_type))
                print(f"Inserted data into glass_type table for cocktail: {cocktail['strDrink']}")
                self.connection.commit()

            # Insert into alcoholic_status table
            alcoholic_status = cocktail.get("strAlcoholic")
            if alcoholic_status:
                self.cursor.execute("INSERT INTO alcoholic_status (cocktail_id, status) VALUES (%s, %s)",
                                    (cocktail["idDrink"], alcoholic_status))
                print(f"Inserted data into alcoholic_status table for cocktail: {cocktail['strDrink']}")
                self.connection.commit()

        # Inserts measures data into the measures table
    def insert_measures_data(self, cocktail_id, measures):
        placeholders = ", ".join(["%s"] * len(measures))
        self.cursor.execute("INSERT INTO measures (cocktail_id, " + ", ".join(
            [f"measure{i}" for i in range(1, len(measures) + 1)]) + ") VALUES (%s, " + placeholders + ")",
            tuple([cocktail_id] + measures))
        print(f"Inserted data into measures table for cocktail_id {cocktail_id}")

        # Commits the transaction
        self.connection.commit()

    def close_connection(self):
        self.connection.close()

    

    def close_connection(self):
        self.connection.close()


# usage example
if __name__ == "__main__":
    db = CocktailDB(db_name)
    all_cocktails = db.fetch_all_cocktails()
    print("Fetched all cocktails.")
    db.insert_cocktail_data(all_cocktails)
    print("Inserted all cocktail data into database.")
    db.close_connection()
    print("Database connection closed.")
