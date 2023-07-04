import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, NavDropdown, Row } from 'react-bootstrap';
import Juego from './Juego';

const Main = ({ favoritos, actualizarFavoritos, notify }) => {

    const [ofertas, editarOfertas] = useState([]);

    const urlPredet = 'https://www.cheapshark.com/api/1.0/deals?'
    const [urlFetch, editarUrlFetch] = useState(urlPredet+'?')

    useEffect(() => {
        fetch(urlPredet)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                editarOfertas(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const ordenarYFiltrar = async () => {
        try {
            const api = await fetch(urlFetch);
            const resultado = await api.json();
            editarOfertas(resultado);
            console.log(ofertas)
        } catch (error) {
            console.log(error);
        };
    }

    return (
        <Container fluid className='p-5 background'>
            <Container className='container-width'>
                <Nav className='d-flex align-items-center'>
                    <h1 className='text-light'>Ofertas destacadas</h1>
                    <NavDropdown
                        className=''
                        title="Ordenar por"
                        data-bs-theme="dark">
                        <NavDropdown.Item onClick={() => editarUrlFetch('https://www.cheapshark.com/api/1.0/deals?sortBy=Title')}>
                            Título
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => editarUrlFetch('https://www.cheapshark.com/api/1.0/deals?sortBy=Savings')}>
                            % de ahorro
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => editarUrlFetch('https://www.cheapshark.com/api/1.0/deals?sortBy=Price')}>
                            Precio oferta
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => editarUrlFetch('https://www.cheapshark.com/api/1.0/deals?sortBy=Metacritic')}>
                            Puntaje Metacritic
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => editarUrlFetch('https://www.cheapshark.com/api/1.0/deals?sortBy=Reviews')}>
                            Reviews positivas
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => editarUrlFetch('https://www.cheapshark.com/api/1.0/deals?sortBy=Release')}>
                            Fecha de lanzamiento
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => editarUrlFetch('https://www.cheapshark.com/api/1.0/deals?sortBy=Store')}>
                            Tienda
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => editarUrlFetch('https://www.cheapshark.com/api/1.0/deals')}>
                            Punta de oferta (predeterminado)
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Button data-bs-theme='dark' onClick={() => ordenarYFiltrar()}>Aplicar</Button>
                </Nav>

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