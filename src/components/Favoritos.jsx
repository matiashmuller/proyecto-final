import React from 'react';
import Juego from './Juego';
import { Container, Row } from 'react-bootstrap';

const Favoritos = ({ favoritos, actualizarFavoritos }) => {
    
    return (
        <Container fluid className='p-5 background'>
            <Container className='container-width'>
                <div className='row-wrapper text-light'>
                    <h1>Mis favoritos</h1>
                    <Row>
                        {console.log(favoritos)}
                        {favoritos.length > 0 ?
                            favoritos.map(juego => (
                                <Juego
                                    juego={juego}
                                    key={juego.dealID? juego.dealID : juego.cheapestDealID}
                                    favoritos={favoritos}
                                    actualizarFavoritos={actualizarFavoritos}
                                />
                            ))
                            :
                            <span className='mt-4'>¡No hay nada por aquí!</span>}
                    </Row>
                </div>
            </Container>
        </Container>
    );
}

export default Favoritos;