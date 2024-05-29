import unittest
# this .mock allows us to mock a database so the sata isn't added to our database when testing. 
from unittest.mock import patch, MagicMock
# patch is a decorator that can replace items with a mock version for completing the test.
from cocktail_data_utils import CocktailDB

class TestCocktailDB(unittest.TestCase):
    
    # this is a set up to ensure a mock-connect and not a real connect to the database
    @patch('cocktail_data_utils.mysql.connector.connect')
    def setUp(self, mock_connect):
        self.mock_conn = MagicMock()
        self.mock_cursor = MagicMock()
        self.mock_conn.cursor.return_value = self.mock_cursor
        mock_connect.return_value = self.mock_conn
        self.db = CocktailDB("test_db")

    @patch('cocktail_data_utils.requests.get')
    def test_fetch_cocktails_by_letter(self, mock_get):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "drinks": [{"idDrink": "11007", "strDrink": "Margarita"}]
        }
        mock_get.return_value = mock_response

        result = self.db.fetch_cocktails_by_letter('a')
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]['strDrink'], "Margarita")

    @patch('cocktail_data_utils.requests.get')
    def test_fetch_all_cocktails(self, mock_get):
        mock_response_with_drinks = MagicMock()
        mock_response_with_drinks.status_code = 200
        mock_response_with_drinks.json.return_value = {
            "drinks": [{"idDrink": "11007", "strDrink": "Margarita"}]
        }

        mock_response_without_drinks = MagicMock()
        mock_response_without_drinks.status_code = 200
        mock_response_without_drinks.json.return_value = {"drinks": []}

        mock_get.side_effect = [
            mock_response_with_drinks if letter in ['a', 'b'] else mock_response_without_drinks
            for letter in "abcdefghijklmnopqrstuvwxyz"
        ]

        result = self.db.fetch_all_cocktails()
        self.assertEqual(len(result), 2)

    def test_insert_cocktail_data(self):
        # mock data to insert
        mock_data = [
            {
                "idDrink": "11007",
                "strDrink": "Margarita",
                "strIngredient1": "Tequila",
                "strIngredient2": "Triple sec",
                "strIngredient3": "Lime juice",
                "strInstructions": "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and not mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
                "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
                "strVideo": None,
                "strCategory": "Ordinary Drink",
                "strAlcoholic": "Alcoholic",
                "dateModified": "2015-08-18 14:42:59",
                "strGlass": "Cocktail glass",
                "strMeasure1": "1 1/2 oz ",
                "strMeasure2": "1/2 oz ",
                "strMeasure3": "1 oz ",
            }
        ]

        self.db.insert_cocktail_data(mock_data)

        # checks if data is correctly inserted into each table
        self.mock_cursor.execute.assert_any_call(
            "INSERT INTO cocktail_names (id, name) VALUES (%s, %s)", 
            ("11007", "Margarita")
        )
        self.mock_cursor.execute.assert_any_call(
            "INSERT INTO ingredients (cocktail_id, ingredient1, ingredient2, ingredient3) VALUES (%s, %s, %s, %s)",
            ("11007", "Tequila", "Triple sec", "Lime juice")
        )
        self.mock_cursor.execute.assert_any_call(
            "INSERT INTO instructions (cocktail_id, instructions) VALUES (%s, %s)", 
            ("11007", "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and not mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.")
        )
        self.mock_cursor.execute.assert_any_call(
            "INSERT INTO images (cocktail_id, image_url) VALUES (%s, %s)", 
            ("11007", "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg")
        )
        self.mock_cursor.execute.assert_any_call(
            "INSERT INTO drinks_information (id, category, type, dateModified) VALUES (%s, %s, %s, %s)",
            ("11007", "Ordinary Drink", "Alcoholic", "2015-08-18 14:42:59")
        )
        self.mock_cursor.execute.assert_any_call(
            "INSERT INTO glass_type (cocktail_id, glass) VALUES (%s, %s)",
            ("11007", "Cocktail glass")
        )
        self.mock_cursor.execute.assert_any_call(
            "INSERT INTO alcoholic_status (cocktail_id, status) VALUES (%s, %s)",
            ("11007", "Alcoholic")
        )

    def test_insert_measures_data(self):
        cocktail_id = "11007"
        measures = ["1 1/2 oz ", "1/2 oz ", "1 oz "]

        self.db.insert_measures_data(cocktail_id, measures)
        self.mock_cursor.execute.assert_called_with(
            "INSERT INTO measures (cocktail_id, measure1, measure2, measure3) VALUES (%s, %s, %s, %s)",
            (cocktail_id, "1 1/2 oz ", "1/2 oz ", "1 oz ")
        )

    def tearDown(self):
        self.db.close_connection()


if __name__ == "__main__":
    unittest.main()
