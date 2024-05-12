import mysql.connector

from config import HOST, USER, PASSWORD

class DBConnectionError(Exception):
    pass


def _connect_to_db(db_name: str):
    connection = mysql.connector.connect(
        host=HOST,
        user=USER,
        password=PASSWORD,
        auth_plugin='mysql_native_password',
        database=db_name
    )
    return connection

# example function

# def show_appointments(_date):
#     try:
#         db_name = 'medical_clinic'
#         db_connection = _connect_to_db(db_name)
#         cursor = db_connection.cursor()
#         print("Connected to DB success")

#         # Define the SQL query within the function and format the result
#         query = """
#         SELECT booking_id, patient_name, doctor_name, appointment_time
#         FROM appointment_bookings
#         WHERE appointment_date = '{}';
#         """.format(_date)

#         print("Query:", query)

#         cursor.execute(query)
#         results = cursor.fetchall()
#         cursor.close()
#         availability = results

#         print("Fetched results:", availability)

#     except Exception as e:
#         raise DBConnectionError(f"Failed to read from database: {e}")
#     finally:
#         if db_connection:
#             db_connection.close()
#             print("DB connection closed")

#     return availability
