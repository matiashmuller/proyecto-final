import React from 'react';
import { Badge } from 'react-bootstrap';
import { Cart2, PersonCircle } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { HashLink } from 'react-router-hash-link';
//import logo from '../assets/logo.png'

const Header = ({ favoritos }) => {

  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className=" p-3" variant="">
          <Container fluid>
            <Navbar.Brand title='Inicio'>
              <HashLink to="/hardware-store"><img  alt="logo" style={{ height: 50}} /></HashLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="bg-dark text-light"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img alt="logo" style={{ height: 50 }} />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="flex-grow-1 pe-3">
                  <NavDropdown
                    title="Componentes"
                    data-bs-theme="dark"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Gabinetes</NavDropdown.Item>
                    <NavDropdown.Item href="#action3">Procesadores</NavDropdown.Item>
                    <NavDropdown.Item href="#action3">Motherboards</NavDropdown.Item>
                    <NavDropdown.Item href="#action3">Disipadores</NavDropdown.Item>
                    {/**
                    <NavDropdown.Item href="#action4">
                      <HashLink to="/hardware-store" style={{ textDecoration: 'none', color: 'inherit' }}>Placas de video</HashLink>
                    </NavDropdown.Item> */}
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Ver todos
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#action2">Sobre nosotros</Nav.Link>
                </Nav>
                <Form className="d-flex me-5">
                  <Form.Control
                    type="search"
                    placeholder="Buscar en toda la tienda"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-primary">Buscar</Button>
                </Form>
                <HashLink to="/hardware-store/carrito" className="m-3 m-md-0 me-md-3 d-flex" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Cart2 size={35} type='button' title='Ver mi carrito'></Cart2>
                  {favoritos.length > 0 ? 
                    <Badge className="align-self-start border border-light rounded-pill" bg="danger">{favoritos.length}</Badge> 
                    : 
                    null}
                </HashLink>
                <PersonCircle size={35} type='button' title='Ingresar' className="m-3 m-md-0 me-md-3 d-flex"></PersonCircle>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;