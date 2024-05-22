# This runs all the code from API- we have a front end but this could be used to run the website idea in the console

import requests
import json
from pprint import pprint

# See all the cocktails in API
def see_all_cocktails():
    result = requests.get(
        'http://127.0.0.1:5001/cocktails/allcocktails',
        headers={'content-type': 'application/json'}
    )
    return result.json()


# See recipie for a requested cocktail
def see_cocktail_recipie(cocktail):
    result = requests.get(
        'http://127.0.0.1:5001/cocktails/{}'.format(cocktail),
        headers={'content-type': 'application/json'}
    )
    return result.json()

# # Space for an endpoint but unable to get recpie based on ingredinets to work
# def see_available_recipies(*args):
#     result = requests.get(
#         'http://127.0.0.1:5001/cocktails/results',
#         headers={'content-type': 'application/json'}
#     )
#     return result.json()


"""# Add a recipie to favourite table
Again I'm not sur why I'm getting errors here
"""

def client_add_fav(userID, cocktailName):
    new_fav = {
        "PersonID": userID,
        "RecipieName": cocktailName
    }
    result = requests.put(
        'http://127.0.0.1:5001/favouriteCocktail',
        headers={'content-type': 'application/json'},
        data=json.dumps(new_fav)
    )
    return result.json()


pprint(see_all_cocktails())
pprint(see_cocktail_recipie("Punch"))
pprint(see_cocktail_recipie("Spritz"))
# see_available_recipies("Rum", "Ice", "Blue Curacao", "Lime juice", "Cranberry juice")

client_add_fav(14, 'Punch')