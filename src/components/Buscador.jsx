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
        <Container fluid className='p-5 bg-dark'>
            <Container>
                <h1 className='text-light'>Buscar un juego</h1>
                <div className='row-wrapper'>
                    <Form className="d-flex me-5" onSubmit={handleSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Ingresa el nombre del juego"
                            className="me-2"
                            aria-label="Search"
                            value={juegoABuscar}
                            onChange={handleChange}
                            
                        />
                        <Button
                            style={{ fontWeight: 'bold', backgroundColor: '#8F43EE' }}
                            title='Agregar a favoritos'
                            variant="dark"
                            onClick={() => buscarOfertasDeJuego(juegoABuscar)}
                        ><Search /></Button>
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