# # MUST DO - Run the server in your terminal using Flask command: choose the one that works
# FLASK_APP=app.py flask run
# OR python3 -m flask --app build_api run --debug OR flask --app build_api run --debug

# python3 app.py

# # https://www.freecodecamp.org/news/what-is-localhost/
# # https://medium.com/@InspireTech/why-it-is-considered-a-good-practice-to-return-json-under-a-data-key-in-api-responses-37286ee2751a#:~:text=by%20Hemant%20%7C%20Medium-,Why%20it%20is%20considered%20a%20good%20practice%20to%20return%20JSON,data%E2%80%9D%20key%20in%20API%20responses&text=Consistency%3A%20By%20encapsulating%20the%20response,structure%20across%20different%20API%20endpoints.
# # https://tedboy.github.io/flask/generated/flask.jsonify.html

# Import Flask module Lowercase flask is a Python library, which you have installed. Uppercase Flask is a class from that library, and it must be imported

# This file defines the Flask application, including routes to handle incoming requests. It serves as the backend API server. It receives requests from clients, processes them, interacts with our database via functions defined in db_utils.py, and sends back responses.

from flask import Flask, jsonify, request
from flask_cors import CORS
from db_utils import show_cocktails_from_picked_ingredients, get_cocktail_details, save_cocktail_name, get_ingredients_from_db, delete_all_saved_cocktail_names, get_saved_cocktail_names_from_db, DBConnectionError

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "Hello world"

@app.route('/ingredients', methods=['GET'])
def get_ingredients():
    try:
        ingredients = get_ingredients_from_db()
        return jsonify({"ingredients": ingredients}), 200
    except DBConnectionError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/cocktails", methods=['POST'])
def get_cocktails():
    try:
        data = request.json
        selected_ingredients = data.get('ingredients', [])

        if not selected_ingredients or not isinstance(selected_ingredients, list):
            return jsonify({"error": "Invalid input, please provide a list of ingredients"}), 400

        cocktails = show_cocktails_from_picked_ingredients(selected_ingredients)

        if not cocktails:
            return jsonify({"message": "No cocktails found with the selected ingredients"}), 404

        return jsonify(cocktails), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except DBConnectionError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/cocktail_details", methods=['GET'])
def get_cocktail_details_route():
    try:
        cocktail_name = request.args.get('name')  
        if not cocktail_name:
            return jsonify({"error": "Cocktail name is required"}), 400

        details = get_cocktail_details(cocktail_name)
        return jsonify(details), 200

    except DBConnectionError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/save_cocktail_name", methods=['POST'])
def save_cocktail_name_route():
    try:
        data = request.json
        cocktail_name = data.get('name')

        if not cocktail_name:
            return jsonify({"error": "Cocktail name is required"}), 400

        save_cocktail_name(cocktail_name)
        return jsonify({"message": "Cocktail name saved successfully"}), 200

    except DBConnectionError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/saved_cocktails', methods=['GET'])
def get_saved_cocktail_names_route():
    try:
        cocktail_names = get_saved_cocktail_names_from_db()
        print("Cocktail names heeeere:", cocktail_names)  
        return jsonify({"saved_cocktails": cocktail_names}), 200
    except DBConnectionError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/delete_saved_cocktail_names", methods=['DELETE'])
def delete_saved_cocktail_names():
    try:
        delete_all_saved_cocktail_names()
        return jsonify({"message": "All entries deleted from saved_cocktail_names table"}), 200

    except DBConnectionError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
