import React from 'react';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Juego = ({ juego, ofertas, carrito, actualizarCarrito }) => {

    const { gameID, external, cheapest, cheapestDealID, thumb, salePrice, normalPrice, dealID, title } = juego;
    {/** 
    const agregarAlCarrito = (id) => {
        const productoSeleccionado = productos.find(
            producto => producto.id === id
        );
        actualizarCarrito([
            ...carrito,
            { id: uuid(), nombre: productoSeleccionado.nombre, precio: productoSeleccionado.precio, img: productoSeleccionado.img }
        ]);
        alert("¡El producto fue agregado a tu carrito!")
    };

    const eliminarDelCarrito = (id) => {
        const nuevoCarrito = carrito.filter(producto => producto.id !== id);
        actualizarCarrito(nuevoCarrito);
        alert("El producto fue eliminado de tu carrito.")
    }
    */}
    return (
        <Col xs={12} sm={6} md={4} lg={3} key={gameID} className='d-flex justify-content-center'>
            <Card style={{ width: '16rem' }} className='text-center mt-5 border-3 border-info'>
                <Card.Img style={{ height: '15rem' }} src={thumb} className='border-bottom border-3' />
                <Card.Body>
                    <Card.Title className="d-flex align-items-center justify-content-center" style={{ height: '5rem' }}>{title}</Card.Title>
                    <Card.Text style={{ height: '25%' }} className='py-3'>
                        Precio oferta: ${salePrice}
                        <br />
                        Precio normal: ${normalPrice}
                        <Button
                            variant="info"
                            className='my-3'
                        ><a
                            style={{ fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}
                            href={"https://www.cheapshark.com/redirect?dealID={" + dealID + "}"}
                            target='blank_'
                        >Ver en tienda
                            </a>
                        </Button>
                        {ofertas ?
                            <Button
                                style={{ fontWeight: 'bold' }}
                                variant="info"
                                onClick={() => agregarAlCarrito(id)}
                            >Agregar a favoritos</Button>
                            :
                            <Button
                                style={{ fontWeight: 'bold' }}
                                variant="danger"
                                onClick={() => eliminarDelCarrito(id)}
                            >Eliminar</Button>
                        }
                    </Card.Text>

                </Card.Body>
            </Card>
        </Col>
    );
}

export default Juego;