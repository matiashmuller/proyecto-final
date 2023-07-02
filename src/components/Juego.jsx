import React from 'react';
import { Col } from 'react-bootstrap';
import { HeartFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Juego = ({ juego, ofertas, favoritos, actualizarFavoritos }) => {

    const { external, cheapest, cheapestDealID, thumb, salePrice, normalPrice, dealID, title } = juego;

    const agregarAFavoritos = (dealID) => {
        const productoSeleccionado = ofertas.find(
            juego => juego.dealID === dealID
        );
        if (favoritos.includes(productoSeleccionado)) {
            alert("¡Esa oferta ya está en favoritos!")
        } else {
            actualizarFavoritos([
                ...favoritos,
                productoSeleccionado
            ]);
            alert("¡La oferta fue agregada a tus favoritos!")
        }
    };

    const eliminarDeFavoritos = (dealID) => {
        const nuevosFavoritos = favoritos.filter(juego => juego.dealID !== dealID);
        actualizarFavoritos(nuevosFavoritos);
        alert("La oferta fue eliminada de favoritos.")
    }

    return (
        <Col xs={12} sm={6} md={4} lg={3} key={dealID} className='d-flex justify-content-center'>
            <Card style={{ width: '16rem' }} className='text-center mt-5 border-3 card'>
                <Card.Img style={{ height: '15rem' }} src={thumb} className='border-bottom border-3' />
                <Card.Body>
                    <Card.Title 
                        className="d-flex align-items-center justify-content-center" 
                        style={{ height: '5rem' }}
                        >{external? external:title}
                    </Card.Title>
                    <Card.Text style={{ height: '25%' }} className='py-3'>
                        Precio oferta: ${salePrice}
                        <br />
                        Precio normal: ${normalPrice}
                        <Button style={{ fontWeight: 'bold', backgroundColor: '#8F43EE'}}
                            variant="dark"
                            className='my-3 me-2'
                        ><a
                            style={{ fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}
                            href={"https://www.cheapshark.com/redirect?dealID={" + dealID + "}"}
                            target='blank_'
                        >Ver en tienda
                            </a>
                        </Button>
                        {ofertas ?
                            <Button
                                style={{ fontWeight: 'bold', backgroundColor: '#8F43EE'}}
                                title='Agregar a favoritos'
                                variant="dark"
                                onClick={() => agregarAFavoritos(dealID)}
                            ><HeartFill/></Button>
                            :
                            <Button
                                style={{ fontWeight: 'bold', backgroundColor: '#8F43EE' }}
                                variant="danger"
                                onClick={() => eliminarDeFavoritos(dealID)}
                            >Eliminar</Button>
                        }
                    </Card.Text>

                </Card.Body>
            </Card>
        </Col>
    );
}

export default Juego;