import React, { useState } from 'react';
import Juego from './Juego';
import { Container, Form, Row } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';

const Buscador = ({ favoritos, actualizarFavoritos }) => {

    const [ofertasBuscado, editarOfertasBuscado] = useState([]);

    const buscarOfertasDeJuego = async (nombre) => {
        try {
            const api = await fetch("https://www.cheapshark.com/api/1.0/games?title=" + nombre);
            const resultado = await api.json();
            editarOfertasBuscado(resultado);
            console.log(ofertasBuscado)
        } catch (error) {
            console.log(error);
        };
    }

    const [juegoABuscar, editarJuegoABuscar] = useState("");

    const handleChange = (e) => {
        editarJuegoABuscar(e.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        buscarOfertasDeJuego(juegoABuscar);
    };

    return (
        <Container fluid className='p-5 background'>
            <Container className='container-width'>
                <h1 className='text-light'>Buscar un juego</h1>
                <div className='row-wrapper'>
                    <Form className="d-flex justify-content-center mt-5" onSubmit={handleSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Ingresa el nombre del juego"
                            className="me-2 w-75"
                            aria-label="Search"
                            value={juegoABuscar}
                            onChange={handleChange}
                            size='lg'
                            data-bs-theme='dark'
                        />
                        <Button
                            style={{ fontWeight: 'bold'}}
                            title='Agregar a favoritos'
                            variant="dark"
                            className='boton'
                            onClick={() => buscarOfertasDeJuego(juegoABuscar)}
                        ><Search />
                        </Button>
                    </Form>
                    <Row>
                        {
                            ofertasBuscado.map(juego => (
                                <Juego
                                    juego={juego}
                                    ofertas={ofertasBuscado}
                                    key={juego.cheapestDealID}
                                    favoritos={favoritos}
                                    actualizarFavoritos={actualizarFavoritos}
                                />
                            ))
                        }
                    </Row>
                </div>
            </Container>
        </Container>
    );
}

export default Buscador;