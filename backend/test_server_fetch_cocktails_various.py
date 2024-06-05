# this file has tests to test the server response. 
# it tests fetching cocktail details, fetching all the ingredients and fetching the details of a particular cocktail. Now it also tests adding a cocktail to the saved_cocktail_names table. 

# it should be OOP

import unittest
import json
import requests

class CocktailApp:
    def __init__(self, server_url):
        self.server_url = server_url

class TestCocktailApp(unittest.TestCase):
    SERVER_URL = 'http://127.0.0.1:5000'

    def test_get_ingredients(self):
        try:
            response = requests.get(f'{self.SERVER_URL}/ingredients')
            if response.status_code == 200:
                ingredients = response.json()
                print("Ingredients:", ingredients)
                self.assertIsInstance(ingredients, list, "Ingredients should be a list")
                self.assertGreater(len(ingredients), 0, "No ingredients fetched")
                print("Test to get ingredients passed successfully")
            else:
                print("Error:", response.text)
        except Exception as e:
            print("Error:", e)

    def test_get_cocktails(self):
        selected_ingredients = ['vodka', 'light cream']
        try:
            url = f"{self.SERVER_URL}/cocktails"
            payload = {'ingredients': selected_ingredients}
            headers = {'Content-Type': 'application/json'}
            response = requests.post(url, data=json.dumps(payload), headers=headers)
            if response.status_code == 200:
                cocktails = response.json()
                print("Cocktails:", cocktails)
                self.assertIsInstance(cocktails, list, "Cocktails should be a list")
                self.assertGreater(len(cocktails), 0, "No cocktails fetched")
                print("Test to get cocktails passed successfully")
            else:
                print("Error:", response.text)
        except Exception as e:
            print("Error:", e)

    def test_get_cocktail_details(self):
        cocktail_name = 'White Russian'
        try:
            url = f"{self.SERVER_URL}/cocktail_details"
            params = {'name': cocktail_name}
            response = requests.get(url, params=params)
            if response.status_code == 200:
                cocktail_details = response.json()
                print("Cocktail Details:", cocktail_details)
                self.assertIsInstance(cocktail_details, dict, "Cocktail details should be a dictionary")
                print("Test to get details passed successfully")
            else:
                print("Error:", response.text)
        except Exception as e:
            print("Error:", e)

    def test_save_cocktail_name(self):
        cocktail_name = 'Margarita'
        try:
            url = f"{self.SERVER_URL}/save_cocktail_name"
            payload = {'name': cocktail_name}
            headers = {'Content-Type': 'application/json'}
            response = requests.post(url, data=json.dumps(payload), headers=headers)
            if response.status_code == 200:
                result = response.json()
                print("Save Cocktail Name:", result)
                self.assertEqual(result, {'message': 'Cocktail name saved successfully'})
                print("Test to save cocktail passed successfully")
            else:
                print("Error:", response.text)
        except Exception as e:
            print("Error:", e)


if __name__ == "__main__":
    unittest.main()
