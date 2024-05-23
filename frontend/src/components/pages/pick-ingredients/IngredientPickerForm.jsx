import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const IngredientPickerForm = ({ onSelectIngredient, onGetCocktails, selectedIngredients }) => {
  const [allIngredients, setAllIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState([]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/ingredients'); //changes API to mine from cocktails db
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setAllIngredients(data); 
        setFilteredIngredients(data);
      } else {
        console.error('Error fetching ingredients:', data.error);
      }
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = allIngredients.filter(ingredient =>
      ingredient.toLowerCase().includes(term)
    );
    setFilteredIngredients(filtered);
  };

  const handleSelectIngredient = (ingredient) => {
    console.log('Ingredient selected:', ingredient);
    const updatedSelectedIngredients = [...selectedIngredients, ingredient];
    onSelectIngredient(updatedSelectedIngredients);
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
        {filteredIngredients.map((ingredient, index) => (
          <li key={index} className="ingredient-item">
            <button onClick={() => handleSelectIngredient(ingredient)}>{ingredient}</button>
          </li>
        ))}
      </ul>
      <div className="selected-ingredients-container">
        <h3>Selected Ingredients:</h3>
        <ul className="selected-ingredients-list">
          {selectedIngredients.map((ingredient, idx) => (
            <li key={idx}>{ingredient}</li>
          ))}
        </ul>
        <button onClick={onGetCocktails}>Get Cocktails</button>
      </div>
    </div>
  );
};

export default IngredientPickerForm;
