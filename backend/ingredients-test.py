import unittest
import requests

class TestGetIngredients(unittest.TestCase):
    BASE_URL = 'http://127.0.0.1:5000'

    def test_get_ingredients(self):
        try:
            response = requests.get(f'{self.BASE_URL}/ingredients')
            if response.status_code == 200:
                ingredients = response.json()
                print("Ingredients:", ingredients)
                self.assertIsInstance(ingredients, list, "Ingredients should be a list")
                self.assertGreater(len(ingredients), 0, "No ingredients fetched")
                print("Test passed successfully")
            else:
                print("Error:", response.text)
        except Exception as e:
            print("Error:", e)

if __name__ == '__main__':
    unittest.main()
