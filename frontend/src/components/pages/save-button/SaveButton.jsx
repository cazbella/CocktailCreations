//updated to change to local storage

import React from 'react';
import { Button } from 'react-bootstrap';
import './SaveButton.css';

const SaveButton = ({ cocktail }) => {
    const saveCocktailName = () => {
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
            // Get the existing saved cocktails from localStorage
            const savedCocktails = JSON.parse(localStorage.getItem('savedCocktails')) || [];

            // Add the new cocktail name to the array
            savedCocktails.push(cocktailName);

            // Save the updated array back to localStorage
            localStorage.setItem('savedCocktails', JSON.stringify(savedCocktails));

            console.log("Cocktail name saved successfully to local storage");
            alert("Cocktail name saved successfully to local storage");
        } catch (error) {
            console.error("Error saving cocktail name to local storage:", error);
            alert("Failed to save cocktail name to local storage");
        }
    };

    return (
        <Button variant="primary" className='save-random-cocktail-button' onClick={saveCocktailName}>
            Save
        </Button>
    );
};

export default SaveButton;


// import React from 'react';
// import { Button } from 'react-bootstrap';
// import './SaveButton.css';

// const SaveButton = ({ cocktail }) => {
//     const saveCocktailName = async () => {
//         if (!cocktail) {
//             console.error("No cocktail object provided.");
//             alert("No cocktail to save.");
//             return;
//         }

//         // Determine the cocktail name based on the format - 2 APIS!!
//         const cocktailName = cocktail.strDrink || cocktail.cocktail_name;

//         if (!cocktailName) {
//             console.error("No cocktail name available.");
//             alert("No cocktail name available to save.");
//             return;
//         }

//         console.log("Cocktail name to save:", cocktailName); // Debugging

//         try {
//             const response = await fetch('http://localhost:5000/save_cocktail', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ name: cocktailName })
//             });

//             if (response.status === 204) {
//                 console.log("Cocktail name saved successfully");
//                 alert("Cocktail name saved successfully");
//             } else {
//                 const data = await response.json();
//                 console.error("Failed to save cocktail name:", data);
//                 alert("Failed to save cocktail name: " + data.error);
//             }
//         } catch (error) {
//             console.error("Error saving cocktail name:", error);
//             alert("Failed to save cocktail name");
//         }
//     };

//     return (
//         <Button variant="primary" className='save-random-cocktail-button' onClick={saveCocktailName}>
//             Save
//         </Button>
//     );
// };

// export default SaveButton;
