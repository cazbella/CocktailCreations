# this file has tests to test the server response. 
# it tests fetching cocktail details, fetching all the ingredients and fetching the details of a particular cocktail. Now it also tests adding a cocktail to the saved_cocktails table.

import unittest
import json
import requests

class TestCocktailApp(unittest.TestCase):
    SERVER_URL = 'http://127.0.0.1:5000'

    def test_get_ingredients(self):
        try:
            response = requests.get(f'{self.SERVER_URL}/ingredients')
            self.assertEqual(response.status_code, 200, "Expected status code 200 for successful request")
            ingredients = response.json()
            self.assertIsInstance(ingredients, list, "Ingredients should be a list")
            self.assertGreater(len(ingredients), 0, "No ingredients fetched")
            print("Test to get ingredients passed successfully")
            print("Ingredients:", ingredients)
        except requests.exceptions.RequestException as e:
            self.fail(f"Failed to get ingredients: {e}")

    def test_get_cocktails(self):
        selected_ingredients = ['vodka', 'light cream']
        try:
            url = f"{self.SERVER_URL}/cocktails"
            payload = {'ingredients': selected_ingredients}
            headers = {'Content-Type': 'application/json'}
            response = requests.post(url, data=json.dumps(payload), headers=headers)
            self.assertEqual(response.status_code, 200, "Expected status code 200 for successful request")
            cocktails = response.json()
            self.assertIsInstance(cocktails, list, "Cocktails should be a list")
            self.assertGreater(len(cocktails), 0, "No cocktails fetched")
            print("Test to get cocktails passed successfully")
            print("Cocktails:", cocktails)
        except requests.exceptions.RequestException as e:
            self.fail(f"Failed to get cocktails: {e}")

    def test_get_cocktail_details(self):
        cocktail_name = 'White Russian'
        try:
            url = f"{self.SERVER_URL}/cocktail"
            params = {'name': cocktail_name}
            response = requests.get(url, params=params)
            self.assertEqual(response.status_code, 200, "Expected status code 200 for successful request")
            cocktail_details = response.json()
            self.assertIsInstance(cocktail_details, dict, "Cocktail details should be a dictionary")
            print("Test to get details passed successfully")
            print("Cocktail Details:", cocktail_details)
        except requests.exceptions.RequestException as e:
            self.fail(f"Failed to get cocktail details: {e}")

    def test_save_cocktail_name(self):
        cocktail_name = 'Margarita'
        try:
            url = f"{self.SERVER_URL}/save_cocktail"
            payload = {'name': cocktail_name}
            headers = {'Content-Type': 'application/json'}
            response = requests.post(url, data=json.dumps(payload), headers=headers)
            self.assertEqual(response.status_code, 204, "Expected status code 204 for successful request")
            print("Test to save cocktail passed successfully")
            print("Save Cocktail Response:", response.text)
        except requests.exceptions.RequestException as e:
            self.fail(f"Failed to save cocktail: {e}")

if __name__ == "__main__":
    unittest.main()
