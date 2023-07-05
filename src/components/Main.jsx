import React, { useEffect, useState } from 'react';
import { Button, Container, Dropdown, DropdownButton, Nav, NavDropdown, Row } from 'react-bootstrap';
import Juego from './Juego';
import { CheckLg } from 'react-bootstrap-icons';

const Main = ({ favoritos, actualizarFavoritos, notify }) => {

    const urlPredet = 'https://www.cheapshark.com/api/1.0/deals?'

    //State que se va a renderizar
    const [ofertas, editarOfertas] = useState([]);

    //Fetch inicial automático con log a consola
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
    
    //Fetch asincrónico parametrizado con log a consola
    const fetchAsync = async(url, editState, state) => {
        try {
            const api = await fetch(url);
            const resultado = await api.json();
            editState(resultado);
            console.log(state)
        } catch (error) {
            console.log(error);
        };
    }

    /*
    State para controlar la url a la que se quiera hacer fetch con los filtros
    Inicialmente seteado en la url predeterminada, cada elección de filtro agrega lo necesario
    */
    const [urlFiltro, editarUrlFiltro] = useState(urlPredet);

    //Función para aplicar los filtros y orden seleccionados
    const aplicarFiltrosYOrden = () => {
        fetchAsync(urlFiltro, editarOfertas, ofertas)
    }

    //State para fetch de tiendas, inicialmente vacío
    const [tiendas, editarTiendas] = useState([]);

    //Función para hacer fetch de las tiendas disponibles
    const getTiendas = () => {
        fetchAsync('https://www.cheapshark.com/api/1.0/stores', editarTiendas, tiendas)
    }

    //State para controlar los filtros aplicados
    const [filtrosAplicados, editarFiltrosAplicados] = useState([]);

    /*
    Función de acción al clickear un filtro
    Setea/elimina de la url fetch y agrega/quita de filtrosAplicados
    */

    const setFiltro = (sumaURL, nombreFiltro) => {
        console.log(urlFiltro)
        console.log(filtrosAplicados)
        editarUrlFiltro(urlFiltro + sumaURL);
        editarFiltrosAplicados([...filtrosAplicados,nombreFiltro])
        console.log(urlFiltro)
        console.log(filtrosAplicados)
    }

    function estaEnFiltros(nombreFiltro) {
        const filtroIgual = filtrosAplicados.find(
            filtro => filtro === nombreFiltro
        );
        return filtroIgual !== undefined;
    }
    

    return (
        <Container fluid className='p-5 background'>
            <Container className='container-width'>
                <div className='d-flex align-items-center justify-content-between'>
                    <h1 className='text-light'>Ofertas destacadas</h1>
                    <Nav data-bs-theme="dark">
                        {/**Dropdown filtros */}
                        <NavDropdown
                            title="Filtrar por"
                            data-bs-theme="dark">
                            {/**Subdropdown tiendas */}
                            <NavDropdown
                                title='Tienda'
                                drop='start'
                                onClick={() => getTiendas()}>
                                {tiendas.map((tienda) => (
                                    <NavDropdown.Item
                                        key={tienda.storeID}
                                        onClick={() => editarUrlFiltro(urlFiltro + '&storeID=' + tienda.storeID)}>
                                        {tienda.storeName}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            <NavDropdown.Item onClick={() => editarUrlFiltro(urlFiltro + '&AAA=1')}>
                                Sólo AAA
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => editarUrlFiltro(urlFiltro + '&onSale=1')}>
                                Sólo juegos en oferta
                            </NavDropdown.Item>
                        </NavDropdown>
                        {/**Dropdown ordenar por */}
                        <NavDropdown
                            title="Ordenar por"
                            data-bs-theme="dark">
                            <NavDropdown.Item onClick={() => setFiltro('&sortBy=Title', 'Título')}>
                                Título
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setFiltro('&sortBy=Savings', '% de ahorro')}>
                                % de ahorro
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => editarUrlFiltro(urlFiltro + '&sortBy=Price')}>
                                Precio oferta
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => editarUrlFiltro(urlFiltro + '&sortBy=Metacritic')}>
                                Puntaje Metacritic
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => editarUrlFiltro(urlFiltro + '&sortBy=Reviews')}>
                                Reviews positivas
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => editarUrlFiltro(urlFiltro + '&sortBy=Release')}>
                                Fecha de lanzamiento
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => editarUrlFiltro(urlFiltro + '&sortBy=Store')}>
                                Tienda
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => editarUrlFiltro(urlFiltro + '&sortBy=Deal Rating')}>
                                Puntaje de oferta (predeterminado)
                            </NavDropdown.Item>
                        </NavDropdown>
                        {/**Botón aplicar */}
                        <Button
                            className='boton'
                            variant='dark' 
                            size='sm'
                            onClick={() => aplicarFiltrosYOrden()}>
                            Aplicar
                            <CheckLg className='ms-2 mb-1'></CheckLg>
                        </Button>
                    </Nav>
                </div>
                <div className='d-flex align-items-center justify-content-end'>
                    <Button>Filtro</Button>
                </div>
                {/* Mapeo de resultados en cards */}
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