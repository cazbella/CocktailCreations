import React, { useState } from 'react';
import CocktailsByNameFetch from './CocktailsByNameFetch';

import "./CocktailsByNamePage.css"

// state to set cocktail
const CocktailSearchPage = () => {
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [error, setError] = useState('');

  const handleSelectCocktail = cocktail => {
    setSelectedCocktail(cocktail);
  };

  // parses jason to return and display wanted information from cocktailsdb
  return (
    <div>
      <h1>Cocktails by Name Page</h1>
      <CocktailsByNameFetch setError={setError} onSelectCocktail={handleSelectCocktail} />
      {error && <p>Error: {error}</p>}
      {selectedCocktail && (
        <div>
          <h2>Selected Cocktail</h2>
          <p>{selectedCocktail.strDrink}</p>
          <img src={selectedCocktail.strDrinkThumb} alt={selectedCocktail.strD} />
          <p>{selectedCocktail.strInstructions}</p>
          <p>Ingredients:</p>
          <ul>
            {Object.keys(selectedCocktail)
              .filter(key => key.startsWith('strIngredient') && selectedCocktail[key])
              .map(key => (
                <li key={key}>{selectedCocktail[key]}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CocktailSearchPage;

// selectedCocktail[key]- Accesses the value associated with the current key
// key.startsWith('strIngredient') - Checks if the current key starts with the string 'strIngredient'
// .filter(...) - Filters the keys of the selectedCocktail object based on the conditions specified.
// .map(...) - Maps over the filtered keys and generates a list item for each key-value pair.
// spread operator (...) is used to expand elements of an iterable
// allows to create a new array by combining the existing selectedIngredients array with a new ingredient being added