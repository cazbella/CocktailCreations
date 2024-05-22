-- EXAMPLE DATABASE TO TEST CODE AND BUILD QUERY FOR MULTIPLE INGREDIENTS

CREATE DATABASE CocktailDB;
USE CocktailDB;

CREATE TABLE `CocktailRecipies` (
`RecipieName` VARCHAR(100),
`Ingredient1` VARCHAR(100),
`Ingredient2` VARCHAR(100),
`Ingredient3` VARCHAR(500),
`Rating` INT
);

INSERT INTO `CocktailRecipies`
(`RecipieName`, `Ingredient1`, `Ingredient2`, `Ingredient3`, `Rating`)
VALUES
("Blue Hurricane", "Rum", "Ice", "Blue Curacao", 9),
("Dry Vermouth", "Bourbon", "Lemon juice", "Lemonade", 7),
("Punch", "Rum", "Lime juice", "Cranberry juice", 3),
("Old Cuban", "White rum", "Lime juice", "Prosecco", 9),
("Vodka Martini", "Vodka", "Dry Vermouth", "Olive", 8),
("Spritz", "Campari", "Prosecco", "Soda water", 8),
("Boston Sidecar", "Rum", "Brandy", "Lime juice", 4),
("Swedish Coffee", "Coffee", "Aquavit", "Sugar", 1);


SELECT * FROM `CocktailRecipies`;


-- Testing queries for use in the API

SELECT * FROM `CocktailRecipies`
WHERE `RecipieName` = "Swedish Coffee";



SELECT * FROM `CocktailRecipies`
where `Ingredient1` in ("Rum", "Ice", "Blue Curacao", "Lime juice", "Cranberry juice")
AND `Ingredient2` in ("Rum", "Ice", "Blue Curacao", "Lime juice", "Cranberry juice")
AND `Ingredient3` in ("Rum", "Ice", "Blue Curacao", "Lime juice", "Cranberry juice");


CREATE TABLE `SavedRecipies` (
`PersonID` INTEGER PRIMARY KEY,
`RecipieName` VARCHAR(100)
);

SELECT * FROM `SavedRecipies`;



