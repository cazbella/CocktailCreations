import React, { useState } from 'react';
import SavedCocktailsFetch from './SavedCocktailsFetch';
import 'bootstrap/dist/css/bootstrap.min.css';

const SavedCocktailsPage = () => {
  const [savedCocktails, setSavedCocktails] = useState([]);

  return (
    <div>
      <h1>Saved Cocktails Page</h1>
      <SavedCocktailsFetch setSavedCocktails={setSavedCocktails} />
      <h2>Saved Cocktails</h2>
      <ul>
        {savedCocktails.map(cocktail => (
          <li key={cocktail.id}>{cocktail.name}</li> 
        ))}
      </ul>
    </div>
  );
};

export default SavedCocktailsPage;

