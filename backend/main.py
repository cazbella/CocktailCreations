# this is just a test file

# This code works to use the created database and the current db_utils and app.py to return a cocktail/s with only the selected ingredients. Currently the ingredient name needs to be exact but this should be ok as the user is ticking the boxes to select incredients. This should eliminate any need for user input error handling. need to put a filter on the list

# defines a Python class CocktailApp, which provides methods to interact with the Flask API server (app.py). It encapsulates HTTP requests to fetch cocktails and cocktail details. This class can be used in other Python scripts or applications to fetch data from the server.

import json
import requests
from db_utils import show_cocktails_from_picked_ingredients, get_cocktail_details

class CocktailApp:
    def __init__(self, server_url):
        self.server_url = server_url

    # this function gets the name of the cocktail based on the selected ingredients
    def get_cocktails(self, selected_ingredients):
        try:
            url = f"{self.server_url}/cocktails"
            payload = {'ingredients': selected_ingredients}
            headers = {'Content-Type': 'application/json'}
            response = requests.post(url, data=json.dumps(payload), headers=headers)
            if response.status_code == 200:
                return response.json()
            else:
                return {'error': response.text}
        except Exception as e:
            return {'error': str(e)}

    def get_cocktail_details(self, cocktail_name):
        try:
            url = f"{self.server_url}/cocktail_details"
            params = {'name': cocktail_name}
            response = requests.get(url, params=params)
            if response.status_code == 200:
                return response.json()
            else:
                return {'error': response.text}
        except Exception as e:
            return {'error': str(e)}

if __name__ == "__main__":
    server_url = 'http://127.0.0.1:5000'  
    app = CocktailApp(server_url)

    selected_ingredients = ['vodka', 'light cream']
    cocktails = app.get_cocktails(selected_ingredients)
    print("Cocktails:", cocktails)

    cocktail_name = 'White Russian'
    cocktail_details = app.get_cocktail_details(cocktail_name)
    print("Cocktail Details:", cocktail_details)
