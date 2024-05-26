import React, { useState, useEffect } from 'react';
import './SavedCocktailsPage.css';
import ClearSavedCocktailsButton from '../clear-button/ClearSavedCocktailsButton';

const SavedCocktailsPage = () => {
  const [savedCocktails, setSavedCocktails] = useState([]);
  const [error, setError] = useState(null);
  const [cocktailDetails, setCocktailDetails] = useState(null);
  const [showCocktailList, setShowCocktailList] = useState(true);
  const [showTitle, setShowTitle] = useState(true);

  const fetchSavedCocktails = async () => {
    try {
      const response = await fetch('http://localhost:5000/saved_cocktails');
      if (!response.ok) {
        throw new Error(`Failed to fetch saved cocktails. Status: ${response.status}`);
      }
      const data = await response.json();
      setSavedCocktails(data.saved_cocktails);
    } catch (error) {
      console.error('Error fetching saved cocktails:', error);
      setError('Failed to load saved cocktails. Please try again later.');
    }
  };

  const fetchCocktailDetails = async (cocktailName) => {
    try {
      const response = await fetch(`http://localhost:5000/cocktail_details?name=${encodeURIComponent(cocktailName)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch cocktail details. Status: ${response.status}`);
      }
      const data = await response.json();
      setCocktailDetails(data);
      setShowCocktailList(false);
      setShowTitle(false);
    } catch (error) {
      console.error('Error fetching cocktail details:', error.message);
      setError('Failed to load cocktail details. Please try again later.');
    }
  };

  const handleBackToList = () => {
    setShowCocktailList(true);
    setCocktailDetails(null);
    setShowTitle(true);
  };

  useEffect(() => {
    fetchSavedCocktails();
  }, []);

  return (
    <div>
      <div className="container">
        {showTitle && <h1 className="title">Saved Cocktails</h1>}
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <>
            {showCocktailList ? (
              <ul className="list-group cocktail-list">
                {savedCocktails.map((cocktail, index) => (
                  <li key={index} className="list-group-item" onClick={() => fetchCocktailDetails(cocktail)}>
                    {cocktail}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{cocktailDetails.cocktail_name}</h5>
                  <p className="card-text">Ingredients:</p>
                  <ul className="card-text">
                    {cocktailDetails.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                  <p className="card-text">Instructions: {cocktailDetails.instructions.instructions}</p>
                  {cocktailDetails.image_url && (
                    <img
                      src={cocktailDetails.image_url.image_url}
                      className="card-img-top"
                      alt="Cocktail"
                    />
                  )}
                  <button className="btn btn-secondary back-btn" onClick={handleBackToList}>Back</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <ClearSavedCocktailsButton />
    </div>
  );
};

export default SavedCocktailsPage;
