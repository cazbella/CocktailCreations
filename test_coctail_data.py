import requests

def fetch_cocktails():
    url = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()["drinks"]
    else:
        print(f"Error fetching cocktails: {response.status_code}")
        return []

# Fetch some sample cocktails
cocktails = fetch_cocktails()

# Extract and print unique glass types
glass_types = set(cocktail['strGlass'] for cocktail in cocktails)
print("Glass Types:")
for glass_type in glass_types:
    print(glass_type)
