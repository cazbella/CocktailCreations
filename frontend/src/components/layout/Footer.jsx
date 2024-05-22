import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './Footer.css';

function CustomFooter() {
  const [expanded, setExpanded] = useState(false);

  const closeMenu = () => setExpanded(false);

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="custom-footer" expanded={expanded}>
      <Navbar.Brand as={Link} to="/" onClick={closeMenu}>🍹</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
      <Navbar.Collapse className='burger-bottom' id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" onClick={closeMenu}>Home</Nav.Link>
          <Nav.Link href="https://www.drinkaware.co.uk/" onClick={closeMenu}>DrinkAware</Nav.Link>
          <Nav.Link href="https://github.com/your-repo" onClick={closeMenu}>Github</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomFooter;
