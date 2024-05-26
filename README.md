# CocktailCreations
CocktailCreations is an application designed to inspire cocktail enthusiasts of all levels to explore and create delicious drinks from the comfort of their homes.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

### Contact Information

#### Caroline 

- **GitHub:** [Cazbella](https://github.com/Cazbella)
- **LinkedIn:** [Caroline-Lane](https://www.linkedin.com/in/caroline-lane7/) 


## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [APIs](#APIs)
- [Challenges](#challenges)
- [Future-Development](#future-development)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

## Description

CocktailCreations is a web application designed to provide users with a vast collection of cocktail recipes. Whether you're hosting a party, experimenting with mixology, or simply looking for a refreshing drink, CocktailCreations has you covered. With its intuitive interface and extensive database of cocktail recipes, you can easily find the perfect drink for any occasion.

### User Story

"As a cocktail enthusiast, I want to discover new and exciting cocktail recipes so that I can expand my mixology skills and impress my friends and family with delicious drinks. I also want a convenient way to access a wide variety of recipes and learn about different ingredients and techniques used in cocktail making. With CocktailCreations, I can easily browse, search, and explore a vast collection of cocktail recipes, finding inspiration for every occasion and enhancing my enjoyment of cocktail culture."

### Motivation

Your motivation for using CocktailCreations could be driven by various factors:

1. Passion for Cocktails: You have a genuine love for cocktails and enjoy experimenting with new recipes and flavors. CocktailCreations provides you with a convenient platform to indulge in your passion and discover exciting new concoctions.

2. Social Gatherings: You frequently host gatherings or parties and want to impress your guests with unique and delicious cocktails. CocktailCreations helps you find the perfect recipes to elevate your hosting game and create memorable experiences for your friends and family.

3. Personal Growth: You view mixology as a hobby and are constantly seeking to improve your skills and knowledge. CocktailCreations offers educational resources and a diverse range of recipes to help you expand your repertoire and become a more proficient home bartender.

4. Exploration and Discovery: You enjoy exploring different flavors and ingredients and are always on the lookout for new cocktail recipes to try. CocktailCreations satisfies your curiosity by providing a vast database of recipes, allowing you to embark on a journey of discovery and creativity in the world of mixology.

5. Convenience and Accessibility: You appreciate the convenience of having access to a centralized platform where you can easily find, save, and reference cocktail recipes whenever you need them. CocktailCreations offers a user-friendly interface and robust search functionality, making it effortless to navigate and explore its extensive collection of recipes.

<br>

## Installation

To run Cocktail Creations locally, follow these steps:

1. Clone the repository to your local machine: `git clone https://github.com/cazbella/CocktailCreations.git`
2. Navigate to the project directory: `cd CocktailCreations/backend`
3. Create a virtual environment:
    
    **For Windows**

    `python -m venv env
.\env\Scripts\activate
`
   **For MacOS/Linux**
   `python3 -m venv env
source env/bin/activate`

4. Install the required dependencies from requirements.txt using `pip install -r requirements.txt`

5. Start the application: `flask run` or `FLASK_APP=app.py flask run`

7. Now navigate to `cd CocktailCreations/frontend`

8. Ensure you have `Node` installed. 

9. Install dependencies `npm install`

10. Start the development server `npm run dev`

11. Open your web browser and navigate to http://localhost:3000 (or similar) to access CocktailCreations.


### To recreate the cocktailsdb database in your MySQL server

1. **Open MySQL Workbench:**
   Open MySQL Workbench or any other MySQL client you prefer.

2. **Connect to the MySQL Server:**
   Connect to the MySQL server where you want to create the database. Provide the necessary connection details such as hostname, username, and password.

3. **Execute SQL Script:**
   Use the SQL editor to execute SQL scripts from the `mySQL.txt` file to create the database. Start by creating the database.

4. **Create Tables and Schema:**
   Once the database is created, you can create tables and define the schema using SQL commands like `CREATE TABLE`.

5. **Insert Data:**
    Use the `cocktail_data_utils.py` to populate the tables. Ensure you install dependencies from requirements.txt. 

6. **Ready to use:**
    All the pages and functionality on Cocktail Creations should now bw ready to use!

Ensure that your mySQL server and host are open. Alter the `config.py` to include your details. 

## Usage

CocktailCreations offers a user-friendly interface for browsing, searching, and discovering cocktail recipes. Upon accessing the application, users are presented with a curated selection of featured cocktails. They can also explore the full collection by browsing categories or using the search functionality to find specific recipes.

Once a cocktail is selected, users can view instructions on how to prepare it, along with a list of ingredients and any additional notes or tips. CocktailCreations aims to provide recipes and oportunities but for the user to enhance their mixology skills and understanding.

### To use Cocktail Creations:

1. Visit the [CocktailCreations Website](https://cazbella.github.io/CocktailCreations/) (coming soon) or run it locally following the installation instructions above.

2. explore...
SCREEN SHOTS OF LANDING PAGE AMD OTHER FUNCTIONALITY

## APIs

This project uses the online CocktailsDB found [here](https://www.thecocktaildb.com/api.php). 

I have also created API endpoints to use a database created using the data from the above API. This made the data more versatile. By doing this I was able to create the 'Ingredient Picker', which uses my database to select drinks based on specific ingredients. 

I am also able to store and delete 'saved cocktails' to the database using endpoints. 

## Challenges

Challenges for this project including working acc

## Future-Development
1. Adding user profiles to save personalised saved cocktail choices

2. Adding volumes to recipes in order to make the information more useful and precise. 

3. Improving the user interface to implement more graphics on some pages.

4. Introducing 'add your own' cocktails for users. This could contribute to the database as a whole pending moderation. 

5. Potentially linking to online shops so users can order ingredients. 

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Create a new pull request.

## License

This project is licensed under the terms of the MIT license. See [LICENSE](LICENSE) for more information.

## Questions

If you have any questions or issues, please feel free to reach out via GitHub or email.