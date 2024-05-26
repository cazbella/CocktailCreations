import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import IngredientPickerForm from './IngredientPickerForm';
import './IngredientPicker.css';
import '../save-button/SaveButton.css';
import SaveButton from '../save-button/SaveButton';

const IngredientPickerPage = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const [cocktailDetails, setCocktailDetails] = useState(null);
  const [showIngredients, setShowIngredients] = useState(true); // whether to show ingredients or cocktails
  const [showNoCocktailsModal, setShowNoCocktailsModal] = useState(false);

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

      if (Array.isArray(data) && data.length > 0) {
        setCocktails(data);
        setShowIngredients(false); // Hides ingredients when button clicked
      } else {
        setCocktails([]);
        setShowNoCocktailsModal(true);
      }

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

  const handleCloseNoCocktailsModal = () => {
    setShowNoCocktailsModal(false);
    setShowIngredients(true);
  };

  const handleClearIngredients = () => {
    setSelectedIngredients([]);
  };

  return (
    <div>
      <h1>Ingredient Picker</h1>
      {showIngredients ? ( // Show ingredients or cocktails based on state (set ets)
        <>
          <IngredientPickerForm
            onSelectIngredient={handleSelectIngredient}
            onGetCocktails={handleGetCocktails}
            selectedIngredients={selectedIngredients}
            onClearIngredients={handleClearIngredients}
          />
        </>
      ) : (
        <div>
          <button className='back' onClick={handleBack}>Back</button> {/* back button */}
          <div>
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
            <Card.Title className='title-picked-cocktail'>{cocktailDetails.cocktail_name}</Card.Title>
            <Card.Text>Ingredients:</Card.Text>
            <ul>
              {cocktailDetails.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <Card.Text>Instructions: {cocktailDetails.instructions.instructions}</Card.Text>
           
            {cocktailDetails.image_url && (
              <img className='image'
                src={cocktailDetails.image_url.image_url}
                alt="Cocktail"
                onError={(e) => {
                  e.target.onerror = null; // stops infinite loop
                  e.target.src = 'fallback-image-url.jpg'; // need to put one here
                }}
              />
            )}
            <div className="card-body-buttons">
              <SaveButton cocktail={cocktailDetails} />
              <Button className='back-bottom' variant="secondary" onClick={handleBack}>Back</Button>
            </div>
          </Card.Body>
        </Card>
      )}
      <Modal show={showNoCocktailsModal} onHide={handleCloseNoCocktailsModal}>
        <Modal.Header closeButton>
          <Modal.Title>No Cocktails Available</Modal.Title>
        </Modal.Header>
        <Modal.Body>No cocktails available, please pick another ingredient.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNoCocktailsModal}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IngredientPickerPage;





//Object.keys(cocktailDetails.ingredients) to get an array of all keys in the ingredients object.

//Conditional Rendering: Inside the map function is a conditional check to ensure that only keys starting with 'ingredient' and having non-null values are rendered. Otherwise null ones would appear in the ingredient list. 

//For each valid key-value pair it renders a list item  with the ingredient value. This allows all ingredients to be displayed on screen