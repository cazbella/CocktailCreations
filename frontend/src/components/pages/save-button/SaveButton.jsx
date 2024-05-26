import React from 'react';
import { Button } from 'react-bootstrap';
import './SaveButton.css';

const SaveButton = ({ cocktail }) => {
    const saveCocktailName = async () => {
        if (!cocktail) {
            console.error("No cocktail object provided.");
            alert("No cocktail to save.");
            return;
        }

        // Determine the cocktail name based on the format - 2 APIS!!
        const cocktailName = cocktail.strDrink || cocktail.cocktail_name;

        if (!cocktailName) {
            console.error("No cocktail name available.");
            alert("No cocktail name available to save.");
            return;
        }

        console.log("Cocktail name to save:", cocktailName); // Debugging

        try {
            const response = await fetch('http://localhost:5000/save_cocktail_name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: cocktailName })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Cocktail name saved successfully");
                alert("Cocktail name saved successfully");
            } else {
                console.error("Failed to save cocktail name:", data);
                alert("Failed to save cocktail name: " + data.error);
            }
        } catch (error) {
            console.error("Error saving cocktail name:", error);
            alert("Failed to save cocktail name");
        }
    };

    return (
        <Button variant="primary" className='save-random-cocktail-button' onClick={saveCocktailName}>
            Save
        </Button>
    );
};

export default SaveButton;
