# # MUST DO - Run the server in your terminal using Flask command: choose the one that works python3 -m flask --app build_api run --debug OR flask --app build_api run --debug
# # https://www.freecodecamp.org/news/what-is-localhost/
# # https://medium.com/@InspireTech/why-it-is-considered-a-good-practice-to-return-json-under-a-data-key-in-api-responses-37286ee2751a#:~:text=by%20Hemant%20%7C%20Medium-,Why%20it%20is%20considered%20a%20good%20practice%20to%20return%20JSON,data%E2%80%9D%20key%20in%20API%20responses&text=Consistency%3A%20By%20encapsulating%20the%20response,structure%20across%20different%20API%20endpoints.
# # https://tedboy.github.io/flask/generated/flask.jsonify.html

# # Import Flask module Lowercase flask is a Python library, which you have installed. Uppercase Flask is a class from that library, and it must be imported
# from flask import Flask, jsonify, request
# from db_utils import (
#     show_appointments,
#     add_appointment,
#     delete_appointment,
#     find_available_slots, update_appointment,
# )

# app = Flask(__name__)

# # Endpoint http://127.0.0.1:5000/ - GET METHOD
# @app.route("/")
# def hello_world():
#     return "Hello world"

# # Endpoint http://127.0.0.1:5000/appointments - GET METHOD to return all appointments
# @app.route("/appointments", methods=['GET'])
# def get_appointments():
#     appointments = show_appointments()
#     return jsonify(appointments)


if __name__ == "__main__":
    app.run(debug=True)


