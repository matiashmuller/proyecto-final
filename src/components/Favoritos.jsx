import React from 'react';
import Juego from './Juego';
import { Button, Container, Row } from 'react-bootstrap';
import { XLg } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

const Favoritos = ({ notify, favoritos, actualizarFavoritos }) => {

    const clearFavoritos = () => {
        if (window.confirm('¿Estás seguro? Esto eliminará todos tus favoritos.')) {
            actualizarFavoritos([]);
            notify("Favoritos eliminados");
        }
    }

    return (
        <Container fluid className='p-5 background'>
            <Container className='container-width'>
                <div className='row-wrapper text-light'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h1>Mis favoritos</h1>
                        <Button
                            variant='dark'
                            className='boton'
                            onClick={favoritos.length > 0 ? () => clearFavoritos() : () => notify("¡No hay favoritos!")}>
                            <XLg className=' me-2' />
                            Eliminar todos
                        </Button>
                    </div>
                    <Row>
                        {console.log(favoritos)}
                        {favoritos.length > 0 ?
                            favoritos.map(juego => (
                                <Juego
                                    juego={juego}
                                    key={juego.dealID ? juego.dealID : juego.cheapestDealID}
                                    favoritos={favoritos}
                                    actualizarFavoritos={actualizarFavoritos}
                                    notify={notify}
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