import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/pages/Home.jsx';
import RandomCocktailPage from './components/pages/randomcocktail/RandomCocktail.jsx';
import CocktailSearchPage from './components/pages/cocktail-search/CocktailsByNamePage.jsx';
import SavedCocktailsPage from './components/pages/saved-cocktails/SavedCocktailsPage.jsx';
import IngredientPickerPage from './components/pages/pick-ingredients/IngredientPickerPage.jsx';
import Footer from './components/layout/Footer.jsx'
import Navbar from './components/layout/Navbar.jsx';

import "./index.css"

function App() {
  return (
    <Router>
      <div className="flex-container">
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/random-cocktail" element={<RandomCocktailPage />} />
            <Route path="/by-name" element={<CocktailSearchPage />} />
            <Route path="/ingredient-picker" element={<IngredientPickerPage />} />
            <Route path="/saved" element={<SavedCocktailsPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
