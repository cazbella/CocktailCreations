import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const IngredientPickerForm = ({ onSelectIngredient, onGetCocktails, selectedIngredients }) => {
  const [allIngredients, setAllIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await fetch('https://cocktailcreations.onrender.com/ingredients');
      const data = await response.json();

      if (response.ok) {
        setAllIngredients(data);
        setFilteredIngredients(data);
      } else {
        console.error('Error fetching ingredients:', data.error);
        setErrorMessage(data.error);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      setErrorMessage(error.message);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleSelectIngredient = (ingredient) => {
    const updatedSelectedIngredients = [...selectedIngredients, ingredient];
    onSelectIngredient(updatedSelectedIngredients);
    setSearchTerm('');
  };

  const handleCloseModal = () => setShowModal(false);

  const filteredIngredientsMemo = useMemo(() => {
    return allIngredients.filter(ingredient =>
      ingredient.toLowerCase().includes(searchTerm)
    );
  }, [allIngredients, searchTerm]);

  return (
    <div className="ingredient-picker-container">
      <h2>Select an Ingredient</h2>
      <input
        type="text"
        placeholder="Start typing to search for an ingredient"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      {isLoading ? (
        <p>Loading ingredients...</p>
      ) : (
        <ul className="ingredient-list">
          {filteredIngredientsMemo.map((ingredient, index) => (
            <li key={index} className="ingredient-item">
              <button onClick={() => handleSelectIngredient(ingredient)}>{ingredient}</button>
            </li>
          ))}
        </ul>
      )}
      <div className="selected-ingredients-container">
        <h3 className='selected-title'>Selected Ingredient:</h3>
        <ul className="selected-ingredients-list">
          {selectedIngredients.map((ingredient, idx) => (
            <li key={idx}>{ingredient}</li>
          ))}
        </ul>
        <div className="selected-container-buttons">
          <button className="clear-ingredients-button" onClick={() => onSelectIngredient([])}>Clear Ingredients</button>
          <button className="get-another-cocktail-button" onClick={onGetCocktails}>Get Cocktails</button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IngredientPickerForm;
