import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './IngredientPicker.css'; // Import your CSS file

const IngredientPickerForm = ({ onSelectIngredient, onGetCocktails, selectedIngredients, onClearIngredients }) => {
  const [allIngredients, setAllIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/ingredients');
      const data = await response.json();
      console.log('Fetched data:', data);

      if (response.ok) {
        if (data && Array.isArray(data.ingredients)) {
          setAllIngredients(data.ingredients);
          setFilteredIngredients(data.ingredients);
        } else {
          console.error('Fetched data is not in the expected format:', data);
        }
      } else {
        console.error('Error fetching ingredients:', data.error);
      }
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (Array.isArray(allIngredients)) {
      const filtered = allIngredients.filter(ingredient =>
        ingredient.toLowerCase().includes(term)
      );
      setFilteredIngredients(filtered);
    } else {
      console.error('allIngredients is not an array:', allIngredients);
    }
  };

  const handleSelectIngredient = (ingredient) => {
    console.log('Ingredient selected:', ingredient);
    const updatedSelectedIngredients = [...selectedIngredients, ingredient];
    onSelectIngredient(updatedSelectedIngredients);
    setSearchTerm('');
  };

  const handleNoCocktailsAvailable = () => {
    setShowModal(true);
    console.log('No cocktails available');
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="ingredient-picker-container">
      <h2>Select Ingredients</h2>
      <input
        type="text"
        placeholder="Start typing to search for an ingredient"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <ul className="ingredient-list">
        {Array.isArray(filteredIngredients) && filteredIngredients.map((ingredient, index) => (
          <li key={index} className="ingredient-item">
            <button onClick={() => handleSelectIngredient(ingredient)} className="ingredient-button">{ingredient}</button>
          </li>
        ))}
      </ul>
      <div className="selected-ingredients-container">
        <h3>Selected Ingredients:</h3>
        <ul className="selected-ingredients-list">
          {selectedIngredients.map((ingredient, idx) => (
            <li key={idx}>{ingredient}</li>
          ))}
        </ul>
        <Button onClick={onGetCocktails} className="get-another-cocktail-button">Get Cocktails</Button>
        <Button variant="danger" onClick={onClearIngredients} className="clear-ingredients-button">Clear Ingredients</Button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>No Cocktails Available</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          No cocktails available, please pick another ingredient.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IngredientPickerForm;
