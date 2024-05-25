# this is a test for the delete edpoint. 
# it has to be in a seperate file to the other tests because i wanted to be able to test the other endpoints seperately. 
# i needed to write and test these before trying to implement them intonthe frontend. 

import unittest
import requests

class TestCocktailApp(unittest.TestCase):

    def setUp(self):
        # Flask running local on port 5000
        self.base_url = 'http://localhost:5000'

    def test_delete_saved_cocktail_names(self):
        # created endpoint for deleting saved cocktail names
        delete_endpoint = f'{self.base_url}/delete_saved_cocktail_names'

        # send delete request to the endpoint
        response = requests.delete(delete_endpoint)

        # Check response status code
        self.assertEqual(response.status_code, 200)

        # response message as expected?
        expected_message = "All entries deleted from saved_cocktail_names table"
        self.assertEqual(response.text, expected_message)

if __name__ == '__main__':
    unittest.main()
