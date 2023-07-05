import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap';
import { HeartFill, XLg } from 'react-bootstrap-icons';

const Juego = ({ juego, ofertas, favoritos, actualizarFavoritos, notify }) => {

    /*
    Desestructuración del juego/oferta.
    Dado que los "juegos buscados" son distintos a los de la página pppal
    (tienen muchos menos datos), algunos pertenecen a unos y otros a los otros.
    Juego en pág ppal (deals):
        id = dealID
        título = title
        precio de oferta = salePrice
        precio normal = normalPrice
    Juego buscado:
        id = cheapestDealID (el mismo id del "juego ppal" más barato)
        título = external
        precio = cheapest (es el más barato para ese juego)

    thumb = la imagen/miniatura, común a ambos

    Nota: 
    Dadas estas diferencias, las sucesivas preguntas por "dealID?" en el código.
    Dada la (obvia) igualdad entre la cheapestDealID y el dealID del "default" más barato,
    hay un pequeño bug en favoritos, a solucionar algún día...
     */

    const {
        dealID,
        title,
        salePrice,
        normalPrice,
        cheapestDealID,
        external,
        cheapest,
        thumb
        } = juego;


    //Agrega la oferta a favoritos actualizando el state, y notifica
    const agregarAFavoritos = (ID) => {
        const productoSeleccionado = ofertas.find(
            juego.dealID ? juego => juego.dealID === ID : juego => juego.cheapestDealID === ID
        );
        actualizarFavoritos([
            ...favoritos,
            productoSeleccionado
        ]);
        notify("¡La oferta fue agregada a tus favoritos!")
    };

    //Elimina la oferta de favoritos actualizando el state, y notifica
    const eliminarDeFavoritos = (ID) => {
        const nuevosFavoritos = favoritos.filter(
            juego.dealID ? juego => juego.dealID !== ID : juego => juego.cheapestDealID !== ID
        );
        actualizarFavoritos(nuevosFavoritos);
        notify("La oferta fue eliminada de favoritos.")
    }

    /*
    True si el juego está en favoritos, false caso contrario
    Necesaria más que nada para el efecto de color en el botón del corazón
    */
    function estaEnFavoritos(ID) {
        const productoEnFavoritos = favoritos.find(
            juego.dealID ? juego => juego.dealID === ID : juego => juego.cheapestDealID === ID
        );
        return productoEnFavoritos !== undefined;
    }

    return (
        <Col xs={12} sm={6} md={4} lg={3} key={dealID} className='d-flex justify-content-center'>
            <Card style={{ width: '15rem', height: '26rem' }} className='text-center mt-5 border-3 card'>
                <Card.Img
                    style={{ height: '12rem', minHeight: '12rem' }}
                    src={thumb}
                    className='border-bottom border-3' />
                <Card.Body style={{ color: '#202060' }}>
                    <Card.Title
                        style={{ fontSize: '90%', height: '3rem' }}
                        className='my-1 d-flex align-items-center justify-content-center'>
                        {external ? external : title}
                    </Card.Title>
                    <Card.Text>
                        {dealID ?
                            <div className='mt-3 mb-3'>
                                <Button
                                    variant='danger'
                                    size='sm'
                                    className='mb-1 boton-card-precio'
                                    >Precio oferta: ${salePrice}
                                </Button>
                                <div style={{ fontSize: '80%' }} className=''>
                                    Precio normal: ${normalPrice}
                                </div>
                            </div>
                            :
                            <Button
                                variant='danger'
                                className='mb-3 mt-3 boton-card-precio'
                                >Mejor precio: ${cheapest}
                            </Button>
                        }
                        <Button 
                            style={{ fontWeight: 'bold', maxWidth: '70%' }}
                            variant='dark' 
                            className='boton-card me-1'>
                            <a style={{ fontWeight: 'bold', fontSize: '85%', textDecoration: 'none', color: 'inherit' }}
                                href={ dealID ?
                                        "https://www.cheapshark.com/redirect?dealID={" + dealID + "}"
                                        :
                                        "https://www.cheapshark.com/redirect?dealID={" + cheapestDealID + "}"}
                                target='blank_'
                                >Ver en tienda
                            </a>
                        </Button>
                        {ofertas ?
                            <Button
                                style={{ fontWeight: 'bold' }}
                                title={estaEnFavoritos(dealID ? dealID : cheapestDealID) ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
                                variant="dark"
                                className={estaEnFavoritos(dealID ? dealID : cheapestDealID) ? 'boton' : 'boton-card'}
                                onClick={
                                    estaEnFavoritos(dealID ? dealID : cheapestDealID) ?
                                        () => eliminarDeFavoritos(dealID ? dealID : cheapestDealID)
                                        :
                                        () => agregarAFavoritos(dealID ? dealID : cheapestDealID)
                                    }>
                                <HeartFill/>
                            </Button>
                            :
                            <Button
                                style={{ fontWeight: 'bold' }}
                                variant="dark"
                                className='boton-card'
                                title='Eliminar de favoritos'
                                onClick={() => eliminarDeFavoritos(dealID ? dealID : cheapestDealID)}>
                                <XLg className='mb-1'/>
                            </Button>
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default Juego;