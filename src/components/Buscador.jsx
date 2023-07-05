import React from 'react';
import Juego from './Juego';
import Button from 'react-bootstrap/Button';
import { Container, Form, Row } from 'react-bootstrap';
import { Joystick, Search } from 'react-bootstrap-icons';

const Buscador = ({ juegoABuscar, handleChange, buscarOfertasDeJuego, ofertasBuscado, favoritos, actualizarFavoritos, notify }) => {

    /*
    Handle necesario con preventDefault para que no recargue la página
    Busca las ofertas del juego ingresado (state "juegoABuscar")
     */
    const handleSubmit = event => {
        event.preventDefault();
        buscarOfertasDeJuego(juegoABuscar);
    };
    
    return (
        <Container fluid className='p-5 background'>
            <Container className='container-width text-light'>
                <h1 className='text-center'>Buscar un juego</h1>
                <div className='row-wrapper'>
                    <Form className="d-flex justify-content-center mt-5" onSubmit={handleSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Ingresa el nombre del juego"
                            className="me-2 w-50"
                            aria-label="Search"
                            value={juegoABuscar}
                            onChange={handleChange}
                            size='lg'
                            data-bs-theme='dark'
                            style={{minWidth: '7em'}}
                        />
                        <Button
                            style={{ fontWeight: 'bold'}}
                            title='Buscar'
                            variant="dark"
                            className='boton'
                            onClick={() => buscarOfertasDeJuego(juegoABuscar)}>
                            <Search />
                        </Button>
                    </Form>
                    <Row>
                        {ofertasBuscado.length > 0?
                            ofertasBuscado.map(juego => (
                                <Juego
                                    juego={juego}
                                    ofertas={ofertasBuscado}
                                    key={juego.cheapestDealID}
                                    favoritos={favoritos}
                                    actualizarFavoritos={actualizarFavoritos}
                                    notify={notify}
                                />
                            ))
                            :
                            <span className='mt-5 text-center' data-bs-theme="dark">
                                ¡Cómprame Apocalipsis o púdrete!
                                <Joystick className='mx-2 mb-1'/>
                            </span>
                        }
                    </Row>
                </div>
            </Container>
        </Container>
    );
}

export default Buscador;