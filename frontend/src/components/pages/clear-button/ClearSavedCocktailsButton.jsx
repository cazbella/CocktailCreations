import React from 'react';
import './ClearSavedCocktailsButton.css';

const ClearSavedCocktailsButton = () => {
  const handleClearSavedCocktails = async () => {
    try {
      const response = await fetch('http://localhost:5000/delete_saved_cocktails', {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to clear saved cocktails. Status: ${response.status}`);
      }
      // Reloads page after clearing saved cocktails so box doesn't persist. Cleaner
      window.location.reload();
    } catch (error) {
      console.error('Error clearing saved cocktails:', error.message);
    }
  };

  return (
    <div className="text-center">
      <button className="btn btn-danger clear-btn" onClick={handleClearSavedCocktails}>
        Clear Saved Cocktails
      </button>
    </div>
  );
};

export default ClearSavedCocktailsButton;

