import os
import mysql.connector

# Retrieve environment variables
HOST = os.getenv('DB_HOST')
USER = os.getenv('DB_USER')
PASSWORD = os.getenv('DB_PASSWORD')

def test_connection():
    try:
        connection = mysql.connector.connect(
            host=HOST,
            user=USER,
            password=PASSWORD,
            auth_plugin='mysql_native_password'
        )
        if connection.is_connected():
            print("Connected to the database")
            connection.close()
        else:
            print("Failed to connect to the database")
    except mysql.connector.Error as err:
        print(f"Error: {err}")

if __name__ == "__main__":
    test_connection()
