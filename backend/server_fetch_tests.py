# this file has tests to test the server response. 
# it tests fetching cocktail details, fetching all the ingredients and fetching the details of a particular cocktail. 

# it should be OOP

import json
import requests

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

class TestCocktailApp:
    SERVER_URL = 'http://127.0.0.1:5000'

    def test_get_ingredients(self):
        app = CocktailApp(self.SERVER_URL)
        try:
            response = requests.get(f'{self.SERVER_URL}/ingredients')
            if response.status_code == 200:
                ingredients = response.json()
                print("Ingredients:", ingredients)
                assert isinstance(ingredients, list), "Ingredients should be a list"
                assert len(ingredients) > 0, "No ingredients fetched"
                print("Test passed successfully")
            else:
                print("Error:", response.text)
        except Exception as e:
            print("Error:", e)

    def test_get_cocktails(self):
        app = CocktailApp(self.SERVER_URL)
        selected_ingredients = ['vodka', 'light cream']
        try:
            url = f"{self.SERVER_URL}/cocktails"
            payload = {'ingredients': selected_ingredients}
            headers = {'Content-Type': 'application/json'}
            response = requests.post(url, data=json.dumps(payload), headers=headers)
            if response.status_code == 200:
                cocktails = response.json()
                print("Cocktails:", cocktails)
                assert isinstance(cocktails, list), "Cocktails should be a list"
                assert len(cocktails) > 0, "No cocktails fetched"
                print("Test passed successfully")
            else:
                print("Error:", response.text)
        except Exception as e:
            print("Error:", e)

    def test_get_cocktail_details(self):
        app = CocktailApp(self.SERVER_URL)
        cocktail_name = 'White Russian'
        try:
            url = f"{self.SERVER_URL}/cocktail_details"
            params = {'name': cocktail_name}
            response = requests.get(url, params=params)
            if response.status_code == 200:
                cocktail_details = response.json()
                print("Cocktail Details:", cocktail_details)
                assert isinstance(cocktail_details, dict), "Cocktail details should be a dictionary"
                print("Test passed successfully")
            else:
                print("Error:", response.text)
        except Exception as e:
            print("Error:", e)

if __name__ == "__main__":
    test = TestCocktailApp()
    test.test_get_ingredients()
    test.test_get_cocktails()
    test.test_get_cocktail_details()
