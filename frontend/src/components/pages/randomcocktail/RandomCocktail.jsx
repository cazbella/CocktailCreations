import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import SaveButton from '../save-button/SaveButton.jsx';
import './RandomCocktailPage.css';

const RandomCocktailPage = () => {
  const [cocktail, setCocktail] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRandomCocktail();
  }, []);

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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="container fluid mb-4 random">
        <h1 className="text-center title-random">Random Cocktail</h1>
        <div className="card-container">
          {cocktail ? (
            <Card>
              <Card.Body>
                <h1 className='card-title'>{cocktail.strDrink}</h1>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Ingredient</th>
                      <th>Measure</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 15 }, (_, i) => i + 1).map(i => {
                      const ingredient = cocktail[`strIngredient${i}`];
                      const measure = cocktail[`strMeasure${i}`];
                      if (ingredient) {
                        return (
                          <tr key={i}>
                            <td>{ingredient}</td>
                            <td>{measure}</td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                  </tbody>
                </table>
                <h5 className="text-center mt-4">Instructions</h5>
                <Card.Text>{cocktail.strInstructions}</Card.Text>
                <div className="card-image mt-4">
                  <Card.Img variant="top" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                </div>
                <div className="card-body-buttons">
                  <SaveButton cocktail={cocktail} />
                  <Button variant="primary" className='get-another-cocktail-button' onClick={fetchRandomCocktail}>Search again</Button>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        {/* Modal content */}
      </Modal>
    </div>
  );
};

export default RandomCocktailPage;