//displays list of ingredients fetched from Cocktails DB
//useState and useEffect hooks to manage component state 
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './IngredientPicker.css'

const IngredientPickerForm = ({ onSelectIngredient, onGetCocktails }) => {
  //state variables (allIngredients, searchTerm, filteredIngredients, selectedIngredients) to manage the list of ingredients, search term, filtered ingredients based on search, and the list of selected ingredients.

  const [allIngredients, setAllIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  //fetches the list of ingredients from the cocktail database API (https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list) using the useEffect hook when the component mounts.

  const fetchIngredients = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      if (data && data.drinks) {
        const sortedIngredients = data.drinks.map(drink => drink.strIngredient1).sort();
        setAllIngredients(sortedIngredients);
        setFilteredIngredients(sortedIngredients);
      }
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  //takes search term, changes to lowercase
  //sets search term 
  //filters list based on search
  //updates FilteredIngredients
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = allIngredients.filter(ingredient =>
      ingredient.toLowerCase().includes(term)
    );
    setFilteredIngredients(filtered);
  };

  //handles ingredient selection
  //creates a new array updatedSelectedIngredients by spreading the existing selectedIngredients array and adding the new ingredient to it
  //SPREAD USED HERE
  //updates selected ingredients
  //calls onSelectIngredient function, passing list as an argument 
  //this is a callback functiom - responsible for updating the state or performing any other necessary actions related to the selected ingredients
  const handleSelectIngredient = (ingredient) => {
    const updatedSelectedIngredients = [...selectedIngredients, ingredient];
    setSelectedIngredients(updatedSelectedIngredients);
    onSelectIngredient(updatedSelectedIngredients);
    //clears searc term
    setSearchTerm('');
  };

  return (
    <div className="ingredient-picker-container">
      <h2>Select Ingredients</h2>
      <input
        type="text"
        placeholder="Start typing to search for an ingredient"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <ul className="ingredient-list">
        {filteredIngredients.map(ingredient => (
          <li key={ingredient} className="ingredient-item">
            <button onClick={() => handleSelectIngredient(ingredient)}>{ingredient}</button>
          </li>
        ))}
      </ul>
      <div className="selected-ingredients-container">
        <h3>Selected Ingredients:</h3>
        <ul className="selected-ingredients-list">
          {selectedIngredients.map(ingredient => (
            <li key={ingredient}>
              {ingredient}
            </li>
          ))}
        </ul>
        <button onClick={() => onGetCocktails(selectedIngredients)}>Get Cocktails</button>
      </div>
    </div>
  );
};

export default IngredientPickerForm;