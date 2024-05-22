# This file links the SQL database with the python code

# Allows sql code
import mysql.connector
# Imports info to connect to database
from config import HOST, USER, PASSWORD
# Allows JSON outputs to presented in a nice way
from pprint import pprint

# Raises an exception if there is a problem connecting to the database
class DBConnectionError(Exception):
    pass

# Function to connect to the database (takes DB name input in function call and details from the config file)
def _connect_to_db(db_name: str):
    connection = mysql.connector.connect(
        host=HOST,
        user=USER,
        password=PASSWORD,
        auth_plugin='mysql_native_password',
        database=db_name
    )
    return connection

# Function to run query for all cocktails (testing code)
def select_all_cocktails():
    try:
        db_name = 'CocktailDB' #Change name to database name
        db_connection = _connect_to_db(db_name)
        cursor = db_connection.cursor()
        print("Connected to DB success")
        query = """
        SELECT * FROM `CocktailRecipies`
        """ #Edit query based on database

        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()
    except Exception:
        raise DBConnectionError("Failed to read from database")
    finally:
        if db_connection:
            db_connection.close()
            print("DB connection closed")

    return results

# # Test for select_all_cocktails function
# pprint(select_all_cocktails())

# Function to get all the reviews for a particular cocktail
def specific_cocktail_recipie(_cocktailName):
    try:
        db_name = 'CocktailDB' #Change name to database name
        db_connection = _connect_to_db(db_name)
        cursor = db_connection.cursor()
        print("Connected to DB success")
        query = """
        SELECT * FROM `CocktailRecipies`
        WHERE `RecipieName` = "{}";
        """.format(_cocktailName) # Change query for database

        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()
    except Exception:
        raise DBConnectionError("Failed to read from database")
    finally:
        if db_connection:
            db_connection.close()
            print("DB connection closed")

    return results

# Testing function works to get info from the SQL database
# pprint(specific_cocktail_recipie("SwedishCoffee"))


# FUNCTION FOR RECIPIES YOU HAVE THE INGREDIENTS FOR
def get_cocktails_based_on_recipies(*args):
    try:
        db_name = 'CocktailDB' #Change name to database name
        db_connection = _connect_to_db(db_name)
        cursor = db_connection.cursor()
        print("Connected to DB success")
        query = """
        SELECT * FROM `CocktailRecipies`
        WHERE `Ingredient1` in {}
        AND `Ingredient2` in {}
        AND `Ingredient3` in {};
        """.format(args, args, args) # Change query for database
        print(query) # Testing query

        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()
    except Exception:
        raise DBConnectionError("Failed to read from database")
    finally:
        if db_connection:
            db_connection.close()
            print("DB connection closed")

    return results

# # Testing get cocktails based on ingredients- will show all recipies that are possible- this gives two
# pprint(get_cocktails_based_on_recipies("Rum", "Ice", "Blue Curacao", "Lime juice", "Cranberry juice"))



# Function to add a recipie to you favourites
def add_favourite_recipie(userID, recipieName):
    try:
        db_name = 'CocktailDB' #Change name to database name
        db_connection = _connect_to_db(db_name)
        cursor = db_connection.cursor()
        print("Connected to DB success")
        query = """
        INSERT INTO `SavedRecipies`
        (`PersonID`, `RecipieName`)
        VALUES
        ('{}', '{}');
        """.format(userID, recipieName)

        cursor.execute(query)
        db_connection.commit()
        cursor.close()
        print("New record updated")
    except Exception:
        raise DBConnectionError("Failed to read from database")
    finally:
        if db_connection:
            db_connection.close()
            print("DB connection closed")

# # Testing add a review function
# add_favourite_recipie(13, "SwedishCoffee")