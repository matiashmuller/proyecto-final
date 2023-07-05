import React from 'react';
import { Badge } from 'react-bootstrap';
import { HeartFill, Search } from 'react-bootstrap-icons';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../assets/logo.png';

const Header = ({ juegoABuscar, handleChange, buscarOfertasDeJuego, favoritos }) => {

  //useNavigate para ir al componente buscador cuando se hace submit en el buscador local
  const navegar = useNavigate();

  /*
  Constrola el submit al buscar
  preventDefault para que no recargue la página
  Redirige al componente buscador
  Busca las ofertas del juego ingresado
  */
  const handleSubmit = event => {
    event.preventDefault();
    navegar('/proyecto-final/buscador');
    buscarOfertasDeJuego(juegoABuscar);
  };

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
              data-bs-theme="dark">
              <Offcanvas.Header closeButton >
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img src={logo} alt="logo" style={{ height: 50 }} />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="flex-grow-1 pe-3">
                  <Nav.Link>¡Tus juegos favoritos, las mejores ofertas!</Nav.Link>
                </Nav>
                <Form className="d-flex me-5 mt-3 mb-4 mt-md-0 mb-md-0" onSubmit={handleSubmit}>
                  <Form.Control
                    type="search"
                    placeholder="Buscar un juego"
                    className="me-2"
                    aria-label="Search"
                    size='lg'
                    value={juegoABuscar}
                    onChange={handleChange}
                  />
                  <Button
                    variant='dark'
                    className='boton'
                    title='Buscar'
                    onClick={handleSubmit}>
                    <Search />
                  </Button>
                </Form>
                <HashLink 
                  to="/proyecto-final/favoritos" 
                  className="mt-3 ms-2 mt-md-1 ms-md-0 d-flex" 
                  style={{ textDecoration: 'none' }}>
                  <HeartFill size={35} type='button' title='Ver mis favoritos'></HeartFill>
                  {favoritos.length > 0 ?
                    <Badge className="align-self-start border border-light" bg='danger'>
                      {favoritos.length}
                    </Badge>
                    :
                    null}
                </HashLink>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;