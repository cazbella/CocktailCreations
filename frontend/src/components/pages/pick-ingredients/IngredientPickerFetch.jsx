import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//takes 'selectedIngredients' as a prop 
//child component 

const IngredientPickerFetch = ({ selectedIngredients }) => {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      fetchCocktails();
    }
  }, [selectedIngredients]);

  const fetchCocktails = async () => {
    try {
      // fetches from our database - NEED ENDPOINT
      const response = await fetch('/api/cocktails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients: selectedIngredients })
      });
      const data = await response.json();
      setCocktails(data);
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
  };

  //renders fetched cocktail

  return (
    <div>
      <h2>Fetched Cocktails</h2>
      <ul>
        {cocktails.map(cocktail => (
          <li key={cocktail.id}>
            <div>{cocktail.name}</div>
            <div>{cocktail.instructions}</div>
            <ul>
              {cocktail.ingredients.map(ingredient => (
                <li key={ingredient.id}>{ingredient.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientPickerFetch;
