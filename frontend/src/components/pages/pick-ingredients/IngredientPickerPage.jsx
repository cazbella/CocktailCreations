import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import IngredientPickerForm from './IngredientPickerForm';
import './IngredientPicker.css';

const IngredientPickerPage = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const [cocktailDetails, setCocktailDetails] = useState(null);
  const [showIngredients, setShowIngredients] = useState(true); // whether to show ingredients or cocktails

  const handleSelectIngredient = (ingredients) => {
    console.log('Selected ingredients:', ingredients);
    setSelectedIngredients(ingredients);
  };

  const handleGetCocktails = async () => {
    try {
      console.log('Selected ingredients before fetch:', selectedIngredients);
      const response = await fetch('http://localhost:5000/cocktails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients: selectedIngredients })
      });
      const data = await response.json();
      setCocktails(data);
      setShowIngredients(false); // Hides ingredients when button clicked
      console.log('Fetched cocktails:', data);
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
  };

  const handleGetCocktailDetails = async (cocktailName) => {
    try {
      const response = await fetch(`http://localhost:5000/cocktail_details?name=${encodeURIComponent(cocktailName)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCocktailDetails(data);
      console.log('Fetched INFO:', data);
    } catch (error) {
      console.error('Error fetching cocktail details:', error);
    }
  };

  const handleBack = () => {
    setShowIngredients(true); // Show ingredients again when back is clicked by user
    setCocktailDetails(null); // Clear selected cocktail details when button clicked and go back to list
  };

  return (
    <div>
      <h1>Ingredient Picker</h1>
      {showIngredients ? ( // Show ingredients or cocktails based on state (set ets)
        <IngredientPickerForm
          onSelectIngredient={handleSelectIngredient}
          onGetCocktails={handleGetCocktails}
          selectedIngredients={selectedIngredients}
        />
      ) : (
        <div>
          <button onClick={handleBack}>Back</button> {/* bck button */}
          <div>
            <h2>Fetched Cocktails</h2>
            <ul className="cocktail-list">
              {cocktails.map((cocktail, index) => (
                <li key={index} className="cocktail-item">
                  <button onClick={() => handleGetCocktailDetails(cocktail.name)}>
                    {cocktail.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {cocktailDetails && (
        <Card>
          <Card.Body>
            <Card.Title>Cocktail Details</Card.Title>
            <Card.Text>Instructions: {cocktailDetails.instructions.instructions}</Card.Text>
            <Card.Text>Ingredients:</Card.Text>
            <ul>
              {Object.keys(cocktailDetails.ingredients).map((key, index) => {
                if (key.startsWith('ingredient') && cocktailDetails.ingredients[key]) {
                  return <li key={index}>{cocktailDetails.ingredients[key]}</li>;
                }
                return null;
              })}
            </ul>
            {cocktailDetails.image_url && (
              <img
                src={cocktailDetails.image_url.image_url}
                alt="Cocktail"
                onError={(e) => {
                  e.target.onerror = null; // stops infinite loop
                  e.target.src = 'fallback-image-url.jpg'; // need to put one here
                }}
              />
            )}
            {cocktailDetails.video_url && <a href={cocktailDetails.video_url.video_url}>Video</a>}
            </Card.Body>
        </Card>
      )}
        </div>
      );
};

      export default IngredientPickerPage;




//Object.keys(cocktailDetails.ingredients) to get an array of all keys in the ingredients object.

//Conditional Rendering: Inside the map function is a conditional check to ensure that only keys starting with 'ingredient' and having non-null values are rendered. Otherwise null ones would appear in the ingredient list. 

//For each valid key-value pair it renders a list item  with the ingredient value. This allows all ingredients to be displayed on screen