import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './RandomCocktailPage.css';

const RandomCocktail = () => {
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    fetchRandomCocktail();
  }, []);

  //fetch from cocktailsDB
  const fetchRandomCocktail = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(response => response.json())
      .then(data => {
        if (data.drinks && data.drinks.length > 0) {
          setCocktail(data.drinks[0]);
        } else {
          console.log('No cocktail found');
        }
      })
      .catch(error => console.error('Error fetching cocktail:', error));
  };

  return (
    <div>
      <h1 className="text-center">Random Cocktail</h1>
      {/* bootstrap card */}
      <div className="container fluid mb-4">
        <div className="card-container">
          {cocktail ? (
            <Card>
              {/* map returned data to the card */}
              <h1 className='card-title'>{cocktail.strDrink}</h1>
              <Card.Img className='card-image' variant="top" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <Card.Body>
                <Card.Text>{cocktail.strInstructions}</Card.Text>
                <Card.Text>Ingredients:</Card.Text>
                <ul>
                  {Object.keys(cocktail)
                    .filter(key => key.startsWith('strIngredient') && cocktail[key])
                    .map(key => (
                      <li key={key}>{cocktail[key]}</li>
                    ))}
                </ul>
                {/* button fetches and displays again if wanted by user */}
                <Button variant="primary" onClick={fetchRandomCocktail}>Get Another Cocktail</Button>
              </Card.Body>
            </Card>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RandomCocktail;
