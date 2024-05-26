import unittest
from db_utils import get_saved_cocktail_names, DBConnectionError

class TestGetSavedCocktailNames(unittest.TestCase):

    def test_get_saved_cocktail_names_success(self):
        try:
            result = get_saved_cocktail_names()
            print("Test result:", result)
            self.assertTrue(len(result) > 0, "The result should contain at least one cocktail name.")
        except DBConnectionError as e:
            self.fail(f"DBConnectionError was raised: {str(e)}")

    def test_get_saved_cocktail_names_db_connection_error(self):
        try:
            result = get_saved_cocktail_names()
            # print("Test result:", result)
            self.assertTrue(len(result) > 0, "The result should contain at least one cocktail name.")
        except DBConnectionError as e:
            self.fail(f"DBConnectionError was raised: {str(e)}")

if __name__ == '__main__':
    unittest.main()
