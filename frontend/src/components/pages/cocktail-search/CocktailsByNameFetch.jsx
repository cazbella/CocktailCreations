import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CocktailsByNameFetch = ({ setError, onSelectCocktail }) => {
  //state variables
  //sets value to empty string initially
  const [cocktailName, setCocktailName] = useState('');
  //empty array initially
  const [cocktails, setCocktails] = useState([]);
  //used to update loading state
  const [loading, setLoading] = useState(false);

  const handleInputChange = event => {
    setCocktailName(event.target.value);
  };

  // fetcjes from cocktails DB
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

  //add error handling
  const handleFormSubmit = event => {
    //stops page refreshing - default behaviour
    event.preventDefault();
    const trimmedInput = cocktailName.trim();
    if (!trimmedInput) {
      setError("Please enter a cocktail name.");
      return;
    }
    // removes special characters using REGEX (sortware)
    const sanitizedInput = trimmedInput.replace(/[^a-zA-Z0-9\s]/g, '');
    // More error handling?
    fetchCocktailsByName(sanitizedInput);
  };

  const handleSelectCocktail = cocktail => {
    onSelectCocktail(cocktail);
  };

  return (
    <div>
      <h2>Search Cocktails by Name</h2>
      {loading && <p>Loading...</p>}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter cocktail name"
          value={cocktailName}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
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


//NEED TO ADD ERROR HANDLING HERE 
