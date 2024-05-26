import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import CocktailsByNameFetch from './CocktailsByNameFetch';
import './CocktailsByNamePage.css';
import SaveButton from '../save-button/SaveButton'; 

const CocktailSearchPage = () => {
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [error, setError] = useState('');
  const [showCocktailList, setShowCocktailList] = useState(true);
  const [cocktails, setCocktails] = useState([]);

  const handleSelectCocktail = cocktail => {
    console.log('Selected Cocktail:', cocktail);
    setSelectedCocktail(cocktail);
    setShowCocktailList(false);
  };

  const handleGoBackToList = () => {
    console.log('Going back to list');
    setSelectedCocktail(null);
    setShowCocktailList(true);
  };

  const handleSetCocktails = (newCocktails) => {
    setCocktails(newCocktails);
  };

  const saveSearchedCocktail = () => {
    //originally had the idea to save to local storage but could't get it to work as well as an endpoint!!
    console.log('Saving searched cocktail...');
  };

  return (
    <div className="container">
      {showCocktailList ? (
        <CocktailsByNameFetch
          setError={setError}
          onSelectCocktail={handleSelectCocktail}
          setCocktails={handleSetCocktails}
          cocktails={cocktails}
        />
      ) : (
        <div>
          <h1 className="text-center">Selected Cocktail</h1>
          <div className="card-container">
            {selectedCocktail && (
              <Card className="card">
                <h1 className='card-title'>{selectedCocktail.strDrink}</h1>
                <Card.Img className='card-image' variant="top" src={selectedCocktail.strDrinkThumb} alt={selectedCocktail.strDrink} />
                <Card.Body className='card-body'>
                  <Card.Text>{selectedCocktail.strInstructions}</Card.Text>
                  <Card.Text>Ingredients:</Card.Text>
                  <ul className='ingredient-list'>
                    {Object.keys(selectedCocktail)
                      .filter(key => key.startsWith('strIngredient') && selectedCocktail[key])
                      .map(key => (
                        <li key={key}>{selectedCocktail[key]}</li>
                      ))}
                  </ul>
                  <div className='card-body-buttons'>
                    <SaveButton cocktail={selectedCocktail} />
                    <Button className="close-btn" onClick={handleGoBackToList}>Back</Button>
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
      )}
      {error && <p>Error: {error}</p>}
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