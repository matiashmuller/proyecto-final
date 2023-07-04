import React from 'react';
import { Badge } from 'react-bootstrap';
import { HeartFill, Search } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { HashLink } from 'react-router-hash-link';
import logo from '../assets/logo.png';

const Header = ({ favoritos }) => {

  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="nav-back p-4" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand title='Inicio'>
              <HashLink to="/proyecto-final"><img src={logo} alt="logo" style={{ height: 50 }} /></HashLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="nav-back"
              data-bs-theme="dark"
            >
              <Offcanvas.Header closeButton >
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img src={logo} alt="logo" style={{ height: 50 }} />
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
                    placeholder="Buscar un juego"
                    className="me-2"
                    aria-label="Search"
                    size='lg'
                  />
                  <Button 
                    variant='dark' 
                    className='boton'
                    title='Buscar'>
                    <HashLink style={{ color: 'inherit', textDecoration: 'none' }} to="/proyecto-final/buscador">
                      <Search />
                    </HashLink>
                  </Button>
                </Form>
                <HashLink to="/proyecto-final/favoritos" className="mt-3 ms-2 mt-md-1 ms-md-0 d-flex" style={{ textDecoration: 'none' }}>
                  <HeartFill size={35} type='button' title='Mis favoritos'></HeartFill>
                  {favoritos.length > 0 ?
                    <Badge className="align-self-start border border-light"  bg='danger'>{favoritos.length}</Badge>
                    :
                    null}
                </HashLink>
                {/**
                <PersonCircle size={35} type='button' title='Ingresar' className="m-3 m-md-0 me-md-3 d-flex"></PersonCircle>
                 */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;