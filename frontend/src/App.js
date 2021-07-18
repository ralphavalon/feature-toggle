import React from 'react';
import logo from './logo.svg';
import { Container, Navbar, Nav, NavItem } from 'react-bootstrap';

import './App.css';
import Home from './components/ecosystems/home';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">Feature Toggle</Navbar.Brand>
          <Navbar.Toggle />
        </Container>
        <Nav className="me-auto">
          <Nav.Link href="#">Home</Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <Home />
      </Container>
    </div>
  );
}

export default App;
