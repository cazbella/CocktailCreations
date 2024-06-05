# this was the test before i made it into a test file

import requests

base_url = 'http://localhost:5000'

delete_endpoint = f'{base_url}/delete_saved_cocktail_names'

response = requests.delete(delete_endpoint)

if response.status_code == 200:
    print("Delete operation successful")
else:
    print("Delete operation failed")

print(response.text)
