import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Juego from './Juego';

const Main = ({ofertas, favoritos, actualizarFavoritos}) => {


    return (
        <Container fluid className='p-5 bg-dark'>
            <Container>
                <h1 className='text-light'>Ofertas destacadas</h1>
                <div className='row-wrapper'>
                    <Row>
                        {ofertas.map(juego => (
                            <Juego
                                juego={juego}
                                ofertas={ofertas}
                                key={juego.dealID}
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

export default Main;