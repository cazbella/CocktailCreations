# code now redundant.
# i implemented measures afterwars. This code populate this table 
"""CREATE TABLE measures (
    cocktail_id VARCHAR(255),
    measure1 VARCHAR(255),
    measure2 VARCHAR(255),
    measure3 VARCHAR(255),
    measure4 VARCHAR(255),
    measure5 VARCHAR(255),
    measure6 VARCHAR(255),
    measure7 VARCHAR(255),
    measure8 VARCHAR(255),
    measure9 VARCHAR(255),
    measure10 VARCHAR(255),
    measure11 VARCHAR(255),
    measure12 VARCHAR(255),
    measure13 VARCHAR(255),
    measure14 VARCHAR(255),
    measure15 VARCHAR(255),
    PRIMARY KEY (cocktail_id)
);"""

# with the measures

import requests
import mysql.connector
from config import HOST, USER, PASSWORD

class CocktailDBMeasures:
    def __init__(self, db_name):
        self.connection = mysql.connector.connect(
            host=HOST,
            user=USER,
            password=PASSWORD,
            auth_plugin='mysql_native_password',
            database=db_name
        )
        self.cursor = self.connection.cursor()

    def fetch_cocktails_by_letter(self, letter):
        url = f"https://www.thecocktaildb.com/api/json/v1/1/search.php?f={letter}"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()["drinks"] if "drinks" in response.json() else []
        else:
            print(f"Error fetching cocktails for letter {letter}: {response.status_code}")
            return []

    def insert_measures_data(self, cocktail_id, measures):
        placeholders = ", ".join(["%s"] * len(measures))
        self.cursor.execute("INSERT INTO measures (cocktail_id, " + ", ".join(
            [f"measure{i}" for i in range(1, len(measures) + 1)]) + ") VALUES (%s, " + placeholders + ")",
            tuple([cocktail_id] + measures))
        print(f"Inserted data into measures table for cocktail_id {cocktail_id}")

        # commits the transaction
        self.connection.commit()

    def close_connection(self):
        self.connection.close()


if __name__ == "__main__":
    db = CocktailDBMeasures("cocktaildb")

    # get all cocktails from the API
    all_cocktails = []
    for letter in "abcdefghijklmnopqrstuvwxyz":
        cocktails = db.fetch_cocktails_by_letter(letter)
        if cocktails:
            all_cocktails.extend(cocktails)

    # loop over cocktails and insert measures data
    for cocktail in all_cocktails:
        cocktail_id = cocktail["idDrink"]
        measures = [cocktail.get(f"strMeasure{i}", "") for i in range(1, 16)]
        db.insert_measures_data(cocktail_id, measures)

    # Close connection
    db.close_connection()
