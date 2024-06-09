# This file defines the Flask application, including routes to handle incoming requests. It serves as the backend API server. It receives requests from clients, processes them, interacts with our database via functions defined in db_utils.py, and sends back responses.

"""
Run the server in your terminal using Flask command: choose the one that works

FLASK_APP=app.py flask run
OR
python3 -m flask --app app run --debug
OR
flask --app app run --debug

# python3 app.py

# # https://www.freecodecamp.org/news/what-is-localhost/
# # https://medium.com/@InspireTech/why-it-is-considered-a-good-practice-to-return-json-under-a-data-key-in-api-responses-37286ee2751a#:~:text=by%20Hemant%20%7C%20Medium-,Why%20it%20is%20considered%20a%20good%20practice%20to%20return%20JSON,data%E2%80%9D%20key%20in%20API%20responses&text=Consistency%3A%20By%20encapsulating%20the%20response,structure%20across%20different%20API%20endpoints.
# # https://tedboy.github.io/flask/generated/flask.jsonify.html

# Import Flask module Lowercase flask is a Python library, which you have installed. Uppercase Flask is a class from that library, and it must be imported

"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from db_utils import CocktailDB, DBConnectionError

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})   # need CORS as had lots of errors

# initialise the CocktailDB instance
cocktail_db = CocktailDB('cocktaildb')

# for populating ingredient picker page
@app.route('/ingredients', methods=['GET'])
def get_ingredients():
    try:
        ingredients = cocktail_db.get_ingredients_from_db()
        return jsonify(ingredients)
    except DBConnectionError as e:
        return str(e), 500

# for getting cocktails based on ingredients
@app.route('/cocktails', methods=['POST'])
def show_cocktails():
    selected_ingredients = request.json.get('ingredients', [])
    try:
        cocktails = cocktail_db.show_cocktails_from_picked_ingredients(selected_ingredients)
        return jsonify(cocktails)
    except (DBConnectionError, ValueError) as e:
        return str(e), 500

# for getting all details for a cocktail based on a name
@app.route('/cocktail', methods=['GET'])
def get_cocktail_details():
    cocktail_name = request.args.get('name')
    try:
        details = cocktail_db.get_cocktail_details(cocktail_name)
        return jsonify(details)
    except (DBConnectionError, ValueError) as e:
        return str(e), 500

# for saving the cocktail
@app.route('/save_cocktail', methods=['POST'])
def save_cocktail():
    cocktail_name = request.json.get('name')
    try:
        cocktail_db.save_cocktail_name(cocktail_name)
        return '', 204
    except DBConnectionError as e:
        return str(e), 500

# for getting saved cocktail names
@app.route('/saved_cocktails', methods=['GET'])
def get_saved_cocktails():
    try:
        saved_cocktails = cocktail_db.get_saved_cocktail_names_from_db()
        return jsonify(saved_cocktails)
    except DBConnectionError as e:
        return str(e), 500

# for deleting saved cocktail names
@app.route('/delete_saved_cocktails', methods=['DELETE'])
def delete_saved_cocktails():
    try:
        cocktail_db.delete_all_saved_cocktail_names()
        return '', 204
    except DBConnectionError as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True)
