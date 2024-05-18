# this is just a test file

import requests

 # Function to fetch cocktails by first letter
def fetch_cocktails_by_letter(letter):
     url = f"https://www.thecocktaildb.com/api/json/v1/1/search.php?f={letter}"
     response = requests.get(url)
     if response.status_code == 200:
         return response.json()["drinks"] if "drinks" in response.json() else []
     else:
         print(f"Error fetching cocktails for letter {letter}: {response.status_code}")
         return []

 # Function to fetch all cocktails
 # loope through alphabet and fetch them all with the free API
 # now we need to work out how ro parse them and add them to the database
def fetch_all_cocktails():
     all_cocktails = []
     for letter in "abcdefghijklmnopqrstuvwxyz":
         cocktails = fetch_cocktails_by_letter(letter)
         if cocktails is not None:  # to check response not empty
             all_cocktails.extend(cocktails)
     return all_cocktails


 # Fetch all cocktails
all_cocktails = fetch_all_cocktails()

 # Process all cocktails data

print(all_cocktails)