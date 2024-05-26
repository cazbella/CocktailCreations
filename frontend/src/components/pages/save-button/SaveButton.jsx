import React from 'react';
import { Button } from 'react-bootstrap';
import './SaveButton.css';

const SaveButton = ({ cocktail }) => {
    const saveCocktailName = async () => {
        // need to determine the cocktail name based on the format because of different APIs
        const cocktailName = cocktail.strDrink || cocktail.cocktail_name;

        console.log("Cocktail name to save:", cocktailName); 

        if (!cocktailName) {
            alert("No cocktail name available to save.");
            return;
        }

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
