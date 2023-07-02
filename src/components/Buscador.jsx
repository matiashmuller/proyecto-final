import React from 'react';
import Juego from './Juego';
import { Container, Row } from 'react-bootstrap';

const Buscador = () => {

    const [ofertas, editarOfertas] = useState([]);

    //Consultar gato
    const traerListaOfertas = async () => {
        try {
            const api = await fetch("https://www.cheapshark.com/api/1.0/games?title=godofwar");
            const resultado = await api.json(); //para interpretar, viene en JSON
            //Prestar atención a cómo llamo al dato en "editar"
            editarOfertas(resultado); //selecciono el primer elemento del resultado y le pido la url
        } catch (error) {
            console.log(error);
        };
    }

    return (
        <Container fluid className='p-5 background'>
            <Container>
                <h1>Juego buscado</h1>
                <div className='row-wrapper'>
                    <Row>
                        {ofertas.map(juego => (
                            <Juego
                                juego={juego}
                                ofertas={ofertas}
                                key={juego.gameID}
                            />
                        ))}
                    </Row>
                </div>
            </Container>
        </Container>
    );
}

export default Buscador;