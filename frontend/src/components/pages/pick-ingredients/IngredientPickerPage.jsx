import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import IngredientPickerForm from './IngredientPickerForm';
import './IngredientPicker.css';
import '../save-button/SaveButton.css';
import SaveButton from '../save-button/SaveButton';

const IngredientPickerPage = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [fetchedCocktails, setFetchedCocktails] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const [cocktailDetails, setCocktailDetails] = useState(null);
  const [showIngredients, setShowIngredients] = useState(true);
  const [showNoCocktailsModal, setShowNoCocktailsModal] = useState(false);

  const handleSelectIngredient = (ingredients) => {
    setSelectedIngredients(ingredients);
  };

  const handleGetCocktails = async () => {
    try {
      // const response = await fetch('http://localhost:5000/cocktails', {
      const response = await fetch('http://CocktailCreations.onrender.com/cocktails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: selectedIngredients }),
      });
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setCocktails(data);
        setFetchedCocktails(data); // Store fetched cocktails based on selected ingredients
        setShowIngredients(false);
      } else {
        setCocktails([]);
        setShowNoCocktailsModal(true);
      }
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
  };

  const handleGetCocktailDetails = async (cocktailName) => {
    try {
      // const response = await fetch(`http://localhost:5000/cocktail?name=${encodeURIComponent(cocktailName)}`, {
      const response = await fetch(`http://CocktailCreations.onrender.com/cocktail?name=${encodeURIComponent(cocktailName)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCocktailDetails(data);
      setShowIngredients(false); // Hide ingredient picker when a cocktail is selected
    } catch (error) {
      console.error('Error fetching cocktail details:', error);
    }
  };

  const handleBackToIngredients = () => {
    setShowIngredients(true); // Set showIngredients state to true to return to ingredient list
    setCocktailDetails(null);
  };

  const handleBackToCocktailList = () => {
    setShowIngredients(false); // Set showIngredients state to false to return to cocktail list
    setCocktailDetails(null);
  };

  const handleCloseNoCocktailsModal = () => {
    setShowNoCocktailsModal(false);
    setShowIngredients(true);
  };

  const handleClearIngredients = () => {
    setSelectedIngredients([]);
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', margin: '10px' }}>{showIngredients ? 'Ingredient Picker' : (cocktailDetails ? 'Your Cocktail' : 'Cocktails')}</h1>

      {showIngredients ? (
        <IngredientPickerForm
          onSelectIngredient={handleSelectIngredient}
          onGetCocktails={handleGetCocktails}
          selectedIngredients={selectedIngredients}
          onClearIngredients={handleClearIngredients}
        />
      ) : cocktailDetails ? (
        <div className="card-container">
          <Card className="card">
            <Card.Body>
              <Card.Title className="title-picked-cocktail">{cocktailDetails.cocktail_name}</Card.Title>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Measure</th>
                  </tr>
                </thead>
                <tbody>
                  {cocktailDetails.ingredients.map((ingredient, index) => (
                    <tr key={index}>
                      <td>{ingredient}</td>
                      <td>{cocktailDetails.measures[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h5 className="card-text">Instructions</h5>
              <p>{cocktailDetails.instructions.instructions}</p>
              {cocktailDetails.image_url && (
                <img
                  className="image"
                  src={cocktailDetails.image_url.image_url}
                  alt="Cocktail"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'fallback-image-url.jpg';
                  }}
                />
              )}
              <div className="card-body-buttons">
                <SaveButton cocktail={cocktailDetails} />
                <Button className="back-bottom" variant="secondary" onClick={handleBackToCocktailList}>
                  Back
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div>
          <button className="back" onClick={handleBackToIngredients}>
            Back
          </button>
          <div>
            <ul className="cocktail-list">
              {cocktails.map((cocktail, index) => (
                <li key={index} className="cocktail-item">
                  <button onClick={() => handleGetCocktailDetails(cocktail.name)}>{cocktail.name}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
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