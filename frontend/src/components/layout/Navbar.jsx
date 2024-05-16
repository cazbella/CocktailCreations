import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Navbar.css';

function CustomNavbar() {
  const [expanded, setExpanded] = useState(false);

  //closes menu when an option is clicked.
  const closeMenu = () => setExpanded(false);

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="custom-navbar" expanded={expanded}>
      <Navbar.Brand as={Link} to="/" onClick={closeMenu}>Cocktail Creations</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" onClick={closeMenu}>Home</Nav.Link>
          <Nav.Link as={Link} to="/by-name" onClick={closeMenu}>Cocktail Search</Nav.Link>
          <Nav.Link as={Link} to="/random-cocktail" onClick={closeMenu}>Random Cocktail</Nav.Link>
          <Nav.Link as={Link} to="/ingredient-picker" onClick={closeMenu}>Ingredient Picker</Nav.Link>
          <Nav.Link as={Link} to="/saved" onClick={closeMenu}>My Saved Cocktails</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
