# Server side code. This contains the different Endpoints for the API

from flask import Flask, jsonify, request
from db_utils import select_all_cocktails, specific_cocktail_recipie, get_cocktails_based_on_recipies, \
    add_favourite_recipie

app = Flask(__name__)

# Endpoint to view all the cocktails and their ingredients
@app.route('/cocktails/allcocktails')
def get_all_cocktails():
    cocktailList = select_all_cocktails()
    return jsonify(cocktailList)


# Endpoint to view a specific cocktail (requested by name)
@app.route('/cocktails/<specificCocktail>')
def get_specific_cocktails(specificCocktail):
    Cocktail = specific_cocktail_recipie(specificCocktail)
    return jsonify(Cocktail)


"""# Endpoint to view cocktails based on ingredient search- 
I have been unable to find out how to get a list of arguments into an endpoint
"""

# @app.route('/cocktails/results')
# def ingredient_search_results(*args):
#     cocktailResults = get_cocktails_based_on_recipies(args)
#     return jsonify(cocktailResults)



# Endpoint to add a review to the system
@app.route('/favouriteCocktail', methods=['PUT'])
def add_favourite():
    favouriteCocktail = request.get_json()
    add_favourite_recipie(
        userID=favouriteCocktail['PersonID'],
        recipieName=favouriteCocktail['RecipieName']
    )
    return favouriteCocktail



if __name__ == '__main__':
    app.run(debug=True, port=5001)