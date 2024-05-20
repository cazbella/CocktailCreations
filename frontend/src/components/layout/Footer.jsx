import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './Footer.css';

function CustomFooter() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="custom-footer">
      <Navbar.Brand as={Link} to="/">🍹</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link href="https://www.drinkaware.co.uk/">DrinkAware</Nav.Link>
          <Nav.Link href="https://github.com/your-repo">Github</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomFooter;
