import React from 'react';
import { Card, Button } from 'react-bootstrap';
//to display re-called cocktails

const CocktailDetails = ({ cocktail, onClose }) => {
  return (
    <Card>
      <Card.Img variant="top" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <Card.Body>
        <Card.Title>{cocktail.strDrink}</Card.Title>
        <Card.Text>{cocktail.strInstructions}</Card.Text>
        <Card.Text>Ingredients:</Card.Text>
        <ul>
          {Object.keys(cocktail)
            .filter(key => key.startsWith('strIngredient') && cocktail[key])
            .map(key => (
              <li key={key}>{cocktail[key]}</li>
            ))}
        </ul>
        <Button variant="primary" onClick={onClose}>Close</Button>
      </Card.Body>
    </Card>
  );
};

export default CocktailDetails;
