import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SavedCocktailsPage = () => {
  const [savedCocktails, setSavedCocktails] = useState([]);

  useEffect(() => {
    // Load saved cocktail names from local storage on component mount
    //NEED TO WORK ON THIS 
    const savedCocktailsFromStorage = JSON.parse(localStorage.getItem('savedCocktail')) || [];

      setSavedCocktails([savedCocktailsFromStorage]);
    }, []);
  
    return (
      <div>
        <h1>Saved Cocktails Page</h1>
        <h2>Saved Cocktails</h2>
        <ul>
          {savedCocktails.map((cocktail, index) => (
            <li key={index}>{cocktail.strDrink}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SavedCocktailsPage;
  