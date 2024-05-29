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
          <h1 className="title">Selected Cocktail</h1>
          <div className="card-container">
            {selectedCocktail && (
              <Card>
                <Card.Body>
                  <h1 className='card-title'>{selectedCocktail.strDrink}</h1>
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Ingredient</th>
                        <th>Measure</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(selectedCocktail)
                        .filter(key => key.startsWith('strIngredient') && selectedCocktail[key])
                        .map((key, index) => (
                          <tr key={key}>
                            <td>{selectedCocktail[key]}</td>
                            <td>{selectedCocktail[`strMeasure${index + 1}`]}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <h5 className="text-center mt-4">Instructions</h5>
                  <Card.Text>{selectedCocktail.strInstructions}</Card.Text>
                  <div className="card-image mt-4">
                    <Card.Img variant="top" src={selectedCocktail.strDrinkThumb} alt={selectedCocktail.strDrink} />
                  </div>
                  <div className="card-body-buttons">
                    <SaveButton cocktail={selectedCocktail} />
                    <Button variant="primary" className='close-btn' onClick={handleGoBackToList}>Back</Button>
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