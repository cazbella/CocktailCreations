# this is a test for the delete edpoint. 
# it has to be in a seperate file to the other tests because i wanted to be able to test the other endpoints seperately. 
# i needed to write and test these before trying to implement them intonthe frontend. 

import unittest
import requests

class TestCocktailApp(unittest.TestCase):

    def setUp(self):
        # Flask on port 5000
        self.base_url = 'http://localhost:5000'

    def test_delete_saved_cocktail_names(self):
        delete_endpoint = f'{self.base_url}/delete_saved_cocktails'

        # send delete request
        try:
            response = requests.delete(delete_endpoint)

            self.assertEqual(response.status_code, 204, "Expected status code 204 for successful deletion")

            # response message matches expected message
            expected_message = ""
            self.assertEqual(response.text, expected_message, "Expected empty response")

        except Exception as e:
            self.fail(f"Failed to delete saved cocktail names: {e}")

if __name__ == '__main__':
    unittest.main()
