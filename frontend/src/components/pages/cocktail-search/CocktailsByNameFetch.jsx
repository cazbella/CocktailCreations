import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CocktailsByNamePage.css'; 


const CocktailsByNameFetch = ({ setError, onSelectCocktail, setCocktails, cocktails }) => {
  const [cocktailName, setCocktailName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = event => {
    setCocktailName(event.target.value);
  };

  const fetchCocktailsByName = name => {
    setLoading(true);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(name)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCocktails(data.drinks || []);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFormSubmit = event => {
    event.preventDefault(); // prevent default to keep list under card..
    const trimmedInput = cocktailName.trim();
    if (!trimmedInput) {
      setError("Please enter a cocktail name.");
      return;
    }
    const sanitizedInput = trimmedInput.replace(/[^a-zA-Z0-9\s]/g, '');
    fetchCocktailsByName(sanitizedInput);
  };

  const handleSelectCocktail = cocktail => {
    onSelectCocktail(cocktail);
  };

  return (
    <div>
      <h2 className='search-title'>Search Cocktails by Name</h2>
      <p className='search-instructions'>Type the name or part of the name... then press search!</p>
      {loading && <p>Loading...</p>}
      <form className='cocktail-form' onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Ingredient or name..."
          value={cocktailName}
          onChange={handleInputChange}
          className="cocktail-input"
        />
        <button type="submit" className="cocktail-submit-button">Search</button>
      </form>
      <ul className='cocktail-list'>
        {cocktails.map(cocktail => (
          <li key={cocktail.idDrink}>
            <button onClick={() => handleSelectCocktail(cocktail)}>{cocktail.strDrink}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CocktailsByNameFetch;
