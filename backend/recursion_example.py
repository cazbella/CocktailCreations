# recursion example
# we could use recursion to generate a random list of cocktail ingredients for users to try
# this would be a seperate page and an item for future development

import random
from db_config import get_db_connection

def fetch_all_ingredients():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT DISTINCT ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6, ingredient7, ingredient8, ingredient9, ingredient10, ingredient11, ingredient12, ingredient13, ingredient14, ingredient15 FROM ingredients")
    rows = cursor.fetchall()
    cursor.close()
    connection.close()
    
    ingredients = set()
    for row in rows:
        for ingredient in row:
            if ingredient:  # ensure ingredient is not None or empty
                ingredients.add(ingredient)
    return list(ingredients)

def generate_random_cocktail(num_ingredients, ingredients=None, current_cocktail=None):
    if current_cocktail is None:
        current_cocktail = []

    if ingredients is None:
        ingredients = fetch_all_ingredients()

    if num_ingredients == 0:
        return current_cocktail

    ingredient = random.choice(ingredients)
    if ingredient not in current_cocktail:  # make sure no duplicate ingredients
        current_cocktail.append(ingredient)
    
    return generate_random_cocktail(num_ingredients - 1, ingredients, current_cocktail)

