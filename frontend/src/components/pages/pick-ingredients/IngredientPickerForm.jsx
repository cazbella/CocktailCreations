import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const IngredientPickerForm = ({ onSelectIngredient, onGetCocktails, onGetCocktailDetails }) => {
  const [allIngredients, setAllIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    fetchIngredients();
  }, []);

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
    setSelectedIngredients(updatedSelectedIngredients);
    onSelectIngredient(updatedSelectedIngredients);
    setSearchTerm('');
  };

  const handleGetCocktails = () => {
    onGetCocktails(selectedIngredients);
    // onGetCocktailDetails(cocktails);
    //want it from list - originally had idea to get all possibles
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
          {selectedIngredients.map((ingredient, idx) => (
            <li key={idx}>{ingredient}</li>
          ))}
        </ul>
        <button onClick={handleGetCocktails}>Get Cocktails</button>
      </div>
    </div>
  );
};

export default IngredientPickerForm;
