# this tests the fetching the names from the saved cocktail table.

import unittest
from db_utils import CocktailDB, DBConnectionError

class TestGetSavedCocktailNames(unittest.TestCase):

    def setUp(self):
        self.cocktail_db = CocktailDB('cocktaildb')

    def test_get_saved_cocktail_names_success(self):
        try:
            result = self.cocktail_db.get_saved_cocktail_names_from_db()
            print("Test result:", result)
            self.assertIsNotNone(result, "The result should not be None.")
            self.assertIsInstance(result, list, "The result should be a list.")
        except DBConnectionError as e:
            self.fail(f"DBConnectionError was raised: {str(e)}")

if __name__ == '__main__':
    unittest.main()
