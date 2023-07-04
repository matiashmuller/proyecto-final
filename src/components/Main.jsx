import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Juego from './Juego';

const Main = ({favoritos, actualizarFavoritos, notify}) => {

    const [ofertas, editarOfertas] = useState([]);
  
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
        <Container fluid className='p-5 background'>
            <Container className='container-width'>
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
                                notify={notify}
                            />
                        ))}
                    </Row>
                </div>
            </Container>
        </Container>
    );
}

export default Main;