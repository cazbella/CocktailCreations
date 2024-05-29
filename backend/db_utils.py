# file contains utility functions to interact with the database. It includes functions 1. show_cocktails_from_picked_ingredients to fetch cocktails based on selected ingredients and 2.  get_cocktail_details to retrieve details of a specific cocktail. 3. save_cocktail_name - to save the user's fave cocktails, 4. get_ingredients_from_db - to populate the 'ingredient picker' page, 5. recall datails based on a name, and 6. delete_all_saved_cocktail_names - to delete all from the saved cocktails table. These functions are used by app.py to handle database operations.

import mysql.connector
import logging
from config import HOST, USER, PASSWORD

# setup logging configuration 
#https://docs.python.org/3/library/logging.html#
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class DBConnectionError(Exception):
    pass

# in order to implement some of the techniques learned in class, i looked into decorators and found i could use a logging decorator and apply it to all the functions in utils to log the information that the functions return. This is why the print statements are commented out to make the terminal easier to read. 

def logging_decorator(function):
    def wrapper(*args, **kwargs):
        # args and kwargs - accept any number of positional and keyword arguments.
        # prints when function is entered and exitied and the result
        # would also print if an error occurs. 
        logging.info(f"Entering: {function.__name__} with args: {args} and kwargs: {kwargs}")
        print(f"Entering: {function.__name__} with args: {args} and kwargs: {kwargs}")
        try:
            result = function(*args, **kwargs)
            logging.info(f"Exiting: {function.__name__} with result: {result}")
            print(f"Exiting: {function.__name__} with result: {result}")
            return result
        except Exception as e:
            logging.error(f"Exception in {function.__name__}: {e}")
            print(f"Exception in {function.__name__}: {e}")
            raise
    return wrapper

def _connect_to_db(db_name: str):
    connection = mysql.connector.connect(
        host=HOST,
        user=USER,
        password=PASSWORD,
        auth_plugin='mysql_native_password',
        database=db_name
    )
    return connection

# gets all ingredients for ingredient picker
@logging_decorator
def get_ingredients_from_db():
    db_connection = None
    ingredients = []
    try:
        db_name = 'cocktaildb'
        db_connection = _connect_to_db(db_name)
        cursor = db_connection.cursor()
        # print("Connected to DB successfully")

        query = ("SELECT DISTINCT ingredient1 FROM ingredients UNION SELECT DISTINCT ingredient2 "
                 "FROM ingredients UNION SELECT DISTINCT ingredient3 FROM ingredients UNION "
                 "SELECT DISTINCT ingredient4 FROM ingredients UNION SELECT DISTINCT ingredient5 "
                 "FROM ingredients UNION SELECT DISTINCT ingredient6 FROM ingredients UNION "
                 "SELECT DISTINCT ingredient7 FROM ingredients UNION SELECT DISTINCT ingredient8 "
                 "FROM ingredients UNION SELECT DISTINCT ingredient9 FROM ingredients UNION "
                 "SELECT DISTINCT ingredient10 FROM ingredients UNION SELECT DISTINCT ingredient11 "
                 "FROM ingredients UNION SELECT DISTINCT ingredient12 FROM ingredients UNION "
                 "SELECT DISTINCT ingredient13 FROM ingredients UNION SELECT DISTINCT ingredient14 "
                 "FROM ingredients UNION SELECT DISTINCT ingredient15 FROM ingredients ORDER BY ingredient1;")
        cursor.execute(query)
        results = cursor.fetchall()

        ingredients = [row[0] for row in results if row[0]]  # filter out None values
        # print("Fetched ingredients:", ingredients)

    except Exception as e:
        raise DBConnectionError(f"Failed to read from database: {e}")
    finally:
        if db_connection:
            db_connection.close()
            # print("DB connection closed")

    return ingredients

# ingredient picker - gets cocktail name list based on picked ingredients
@logging_decorator
def show_cocktails_from_picked_ingredients(selected_ingredients):
    if len(selected_ingredients) > 15:
        raise ValueError("A maximum of 15 ingredients can be selected")

    db_connection = None
    cocktails = []
    try:
        db_name = 'cocktaildb'
        db_connection = _connect_to_db(db_name)
        cursor = db_connection.cursor()
        # print("Connected to DB successfully")

        conditions = ' AND '.join([f"{ingredient_placeholder} IN (ing.ingredient1, ing.ingredient2, ing.ingredient3, ing.ingredient4, ing.ingredient5, ing.ingredient6, ing.ingredient7, ing.ingredient8, ing.ingredient9, ing.ingredient10, ing.ingredient11, ing.ingredient12, ing.ingredient13, ing.ingredient14, ing.ingredient15)" for ingredient_placeholder in ['%s'] * len(selected_ingredients)])

        query = (f"SELECT DISTINCT cn.name FROM cocktail_names cn JOIN ingredients ing ON cn.id = ing.cocktail_id "
                 f"WHERE {conditions} GROUP BY cn.name ORDER BY cn.name;")

        # print("SQL Query:", query)

        cursor.execute(query, selected_ingredients)
        results = cursor.fetchall()

        cocktails = [{'name': row[0]} for row in results] if results else []
        # print("Fetched results:", cocktails)

    except Exception as e:
        raise DBConnectionError(f"Failed to read from database: {e}")
    finally:
        if db_connection:
            db_connection.close()
            # print("DB connection closed")

    if not cocktails:
        # print("No cocktail with this combination of ingredients.")
        pass
    
    return cocktails

# cocktail based on name
@logging_decorator
def get_cocktail_details(cocktail_name):
    db_connection = None
    details = {}
    try:
        db_name = 'cocktaildb'
        db_connection = _connect_to_db(db_name)
        cursor = db_connection.cursor(dictionary=True)
        # print("Connected to DB successfully")
        
        query_cocktail_name = "SELECT name FROM cocktail_names cn WHERE cn.name = %s;"
        cursor.execute(query_cocktail_name, (cocktail_name,))
        cocktail_name_result = cursor.fetchone()
        
        if cocktail_name_result:
            details['cocktail_name'] = cocktail_name_result['name']
        else:
            raise ValueError("Cocktail not found in the database.")

        query_ingredients = ("SELECT ing.ingredient1, ing.ingredient2, ing.ingredient3, ing.ingredient4, "
                             "ing.ingredient5, ing.ingredient6, ing.ingredient7, ing.ingredient8, "
                             "ing.ingredient9, ing.ingredient10, ing.ingredient11, ing.ingredient12, "
                             "ing.ingredient13, ing.ingredient14, ing.ingredient15 FROM ingredients ing "
                             "JOIN cocktail_names cn ON cn.id = ing.cocktail_id WHERE cn.name = %s;")
        cursor.execute(query_ingredients, (cocktail_name,))
        ingredient_row = cursor.fetchone()

        ingredients = []
        for value in ingredient_row.values():
            if value is not None:
                ingredients.append(value)

        query_instructions = ("SELECT instructions FROM instructions inst JOIN cocktail_names cn ON cn.id = inst.cocktail_id "
                              "WHERE cn.name = %s;")
        cursor.execute(query_instructions, (cocktail_name,))
        instructions = cursor.fetchone()
        
        query_image = ("SELECT image_url FROM images img JOIN cocktail_names cn ON cn.id = img.cocktail_id "
                       "WHERE cn.name = %s;")
        cursor.execute(query_image, (cocktail_name,))
        image_url = cursor.fetchone()
        
        query_video = ("SELECT video_url FROM videos vid JOIN cocktail_names cn ON cn.id = vid.cocktail_id "
                       "WHERE cn.name = %s;")
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
            # print("DB connection closed")

    return details

# works wuith POST to add cocktails to db
@logging_decorator
def save_cocktail_name(cocktail_name):
    db_connection = None
    try:
        db_name = 'cocktaildb'
        db_connection = _connect_to_db(db_name)
        cursor = db_connection.cursor()
        # print("Connected to DB successfully")

        query = "INSERT INTO saved_cocktail_names (name) VALUES (%s)"
        cursor.execute(query, (cocktail_name,))
        db_connection.commit()
        # print("Cocktail name saved successfully")

    except Exception as e:
        if db_connection:
            db_connection.rollback()
        raise DBConnectionError(f"Failed to save data to database: {e}")
    finally:
        if db_connection:
            db_connection.close()
            # print("DB connection closed")

# recalls user saved cocktails
@logging_decorator
def get_saved_cocktail_names_from_db():
    db_connection = None
    cocktail_names = []
    try:
        db_name = 'cocktaildb'
        db_connection = _connect_to_db(db_name)
        cursor = db_connection.cursor()
        # print("Connected to DB successfully")

        query = "SELECT DISTINCT name FROM saved_cocktail_names;"
        cursor.execute(query)
        results = cursor.fetchall()

        cocktail_names = [row[0] for row in results if row[0]]
        # print("Fetched saved cocktail names:", cocktail_names)

    except Exception as e:
        raise DBConnectionError(f"Failed to read from database: {e}")
    finally:
        if db_connection:
            db_connection.close()
            # print("DB connection closed")

    return cocktail_names

@logging_decorator
def delete_all_saved_cocktail_names():
    db_connection = None
    try:
        db_name = 'cocktaildb'
        db_connection = _connect_to_db(db_name)
        cursor = db_connection.cursor()
        # print("Connected to DB successfully")

        query = "DELETE FROM saved_cocktail_names"
        cursor.execute(query)
        db_connection.commit()
        # print("All entries deleted from saved_cocktail_names table")

    except Exception as e:
        if db_connection:
            db_connection.rollback()
        logging.error(f"Failed to delete entries from saved_cocktail_names table: {e}")
        print(f"Failed to delete entries from saved_cocktail_names table: {e}")
        raise DBConnectionError(f"Failed to delete entries from saved_cocktail_names table: {e}")
    finally:
        if db_connection:
            db_connection.close()
            # print("DB connection closed")




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