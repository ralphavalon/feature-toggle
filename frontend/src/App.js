import React from 'react';
import logo from './logo.svg';
import { Container, Navbar, Nav } from 'react-bootstrap';

import './App.css';
import Home from './components/ecosystems/home';
import ErrorModal from './components/organisms/error-modal';

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
        <ErrorModal />
      </Container>
    </div>
  );
}

export default App;
