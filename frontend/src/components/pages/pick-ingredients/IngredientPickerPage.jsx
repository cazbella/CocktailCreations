import React, { useState } from 'react';
import IngredientPickerForm from './IngredientPickerForm';
import IngredientPickerFetch from './IngredientPickerFetch';
import 'bootstrap/dist/css/bootstrap.min.css';

const IngredientPickerPage = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  //handleSelectIngredient: function is passed down to the IngredientPickerForm component as a prop. It updates the selectedIngredients state with the newly selected ingredient.

  const handleSelectIngredient = (ingredients) => {
    setSelectedIngredients(ingredients);
  };

  const handleGetCocktails = async (ingredients) => {
    try {
      //api/coctails needs to be created
      const response = await fetch('/api/cocktails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients })

      });
      console.log('Selected ingredients:', ingredients);
      const data = await response.json();
      // Handle fetched cocktails data
      console.log('Fetched cocktails:', data);
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
  };

  return (
    <div>
      <h1>Ingredient Picker</h1>
      {/* passes down the handleSelectIngredient and handleGetCocktails functions as props to the IngredientPickerForm component. */}
      <IngredientPickerForm
        onSelectIngredient={handleSelectIngredient}
        onGetCocktails={handleGetCocktails} />
      <IngredientPickerFetch
        selectedIngredients={selectedIngredients}
      />
    </div>
  );
};

export default IngredientPickerPage;
