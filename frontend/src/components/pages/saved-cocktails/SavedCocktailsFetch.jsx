import React, { useState, useEffect } from 'react';

const SavedCocktailsFetch = ({ setSavedCocktails }) => {
  useEffect(() => {
    fetchSavedCocktails();
  }, []);

  const fetchSavedCocktails = async () => {
    try {
      const response = await fetch('/api/saved-cocktails'); // Flask API endpoint for fetching saved cocktails
      if (!response.ok) {
        throw new Error('Failed to fetch saved cocktails');
      }
      const data = await response.json();
      setSavedCocktails(data);
    } catch (error) {
      console.error('Error fetching saved cocktails:', error);
    }
  };

  return (
    <div>
      {/* add loading indicator or error handling here*/}
    </div>
  );
};

export default SavedCocktailsFetch;
