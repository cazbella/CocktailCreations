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
            self.assertTrue(len(result) > 0, "The result should contain at least one cocktail name.")
        except DBConnectionError as e:
            self.fail(f"DBConnectionError was raised: {str(e)}")

if __name__ == '__main__':
    unittest.main()
