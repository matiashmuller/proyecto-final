import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Juego from './Juego';

const Main = () => {

    const [ofertas, editarOfertas] = useState([]);

    //Consultar gato
    useEffect(() => {
        fetch('https://www.cheapshark.com/api/1.0/deals')
           .then((response) => response.json())
           .then((data) => {
              console.log(data);
              editarOfertas(data);
           })
           .catch((err) => {
              console.log(err.message);
           });
     }, []);

    return (
        <Container fluid className='p-5 bg-dark'>
            <Container>
                <h1 className='text-light'>Juegos en oferta</h1>
                <div className='row-wrapper'>
                    <Row>
                        {ofertas.map(juego => (
                            <Juego
                                juego={juego}
                                ofertas={ofertas}
                                key={juego.dealID}
                            />
                        ))}
                    </Row>
                </div>
            </Container>
        </Container>
    );
}

export default Main;