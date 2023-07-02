import React, { useState } from 'react';
import Juego from './Juego';
import { Container, Row } from 'react-bootstrap';

const Buscador = ({ buscarOfertasDeJuego, ofertasBuscado, favoritos, actualizarFavoritos }) => {

    return (
        <Container fluid className='p-5 bg-dark'>
            <Container>
                <h1>Juego buscado</h1>
                <div className='row-wrapper'>
                <button onClick={buscarOfertasDeJuego}></button>
                    <Row>
                        {ofertasBuscado.map(juego => (
                            <Juego
                                juego={juego}
                                ofertas={ofertasBuscado}
                                key={juego.cheapestDealID}
                                favoritos={favoritos}
                                actualizarFavoritos={actualizarFavoritos}
                            />
                        ))}
                    </Row>
                </div>
            </Container>
        </Container>
    );
}

export default Buscador;