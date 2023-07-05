import React, { useEffect, useState } from 'react';
import { Button, Container, Dropdown, DropdownButton, Nav, NavDropdown, Row } from 'react-bootstrap';
import Juego from './Juego';
import { CheckLg, XLg } from 'react-bootstrap-icons';

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
    const fetchAsync = async (url, editState, state) => {
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
        console.log(urlFiltro)
    }

    //State para fetch de tiendas, inicialmente vacío
    const [tiendas, editarTiendas] = useState([]);

    //Función para hacer fetch de las tiendas disponibles al hacer click en la opción
    const getTiendas = () => {
        fetchAsync('https://www.cheapshark.com/api/1.0/stores', editarTiendas, tiendas)
    }

    //State para controlar los filtros aplicados y mapear botones
    const [filtrosAplicados, editarFiltrosAplicados] = useState([]);

    /*
    Función de acción al clickear un filtro
    Agrega/elimina de la url fetch y agrega/quita de filtrosAplicados
    */
    const setFiltro = (sumaURL, nombreFiltro) => {
        const filtroNuevo = filtrosAplicados.find(filtro=>filtro[1]===nombreFiltro)
        if (filtroNuevo===undefined) {
            agregarFiltro(sumaURL,nombreFiltro);
        } else {
            eliminarFiltro(sumaURL,nombreFiltro);
        }
    }

    const agregarFiltro = (sumaURL, nombreFiltro) => {
        editarUrlFiltro(urlFiltro + sumaURL);
        editarFiltrosAplicados([...filtrosAplicados, [sumaURL, nombreFiltro]]);
    }

    const eliminarFiltro = (sumaURL, nombreFiltro) => {
        editarUrlFiltro(urlFiltro.replace(sumaURL, ""));
        editarFiltrosAplicados(filtrosAplicados.filter(filtro=>filtro[1]!==nombreFiltro));
    }

    const eliminarTodosFiltros = () => {
        editarUrlFiltro(urlPredet);
        editarFiltrosAplicados([]);
    }

    return (
        <Container fluid className='p-5 background'>
            <Container className='container-width'>
                <div className='d-md-flex justify-content-md-between align-items-center'>
                    <h1 className='text-light text-center'>Ofertas destacadas</h1>
                    <Nav data-bs-theme="dark" className='align-items-center justify-content-md-end justify-content-center'>
                        {/**Dropdown filtros */}
                        <NavDropdown
                            title="Filtrar por"
                            data-bs-theme="dark">
                            {/**Subdropdown tiendas */}
                            <NavDropdown
                                title='Tienda'
                                drop='end'
                                onClick={() => getTiendas()}>
                                {tiendas.map((tienda) => (
                                    <NavDropdown.Item
                                        key={tienda.storeID}
                                        onClick={() => setFiltro('&storeID=' + tienda.storeID, tienda.storeName)}>
                                        {tienda.storeName}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            <NavDropdown.Item onClick={() => setFiltro('&AAA=1', 'Sólo AAA')}>
                                Sólo AAA ($30+)
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setFiltro('&onSale=1', 'Solo en oferta')}>
                                Sólo en oferta
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
                            <NavDropdown.Item onClick={() => setFiltro('&sortBy=Price', 'Precio oferta')}>
                                Precio oferta
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setFiltro('&sortBy=Metacritic', 'Puntaje Metacritic')}>
                                Puntaje Metacritic
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setFiltro('&sortBy=Reviews', 'Reviews positivas')}>
                                Reviews positivas
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setFiltro('&sortBy=Release', 'Fecha lanzamiento')}>
                                Fecha de lanzamiento
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setFiltro('&sortBy=Store', 'Tienda')}>
                                Tienda
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => setFiltro('&sortBy=Deal Rating', 'Puntaje de oferta')}>
                                Puntaje de oferta (predeterminado)
                            </NavDropdown.Item>
                        </NavDropdown>
                        {/**Botón aplicar y eliminar*/}
                        <Button
                            className='boton me-2 ms-3'
                            variant='dark'
                            size='sm'
                            title='Aplicar filtros'
                            onClick={() => aplicarFiltrosYOrden()}>
                            <CheckLg></CheckLg>
                        </Button>
                        <Button
                            className='boton'
                            variant='dark'
                            size='sm'
                            title='Eliminar todos'
                            onClick={() => eliminarTodosFiltros()}>
                            <XLg></XLg>
                        </Button>
                    </Nav>
                </div>
                {/**Botones indicadores de filtros */}
                <div className='mt-3 d-md-flex align-items-center justify-content-end text-center'>
                    {filtrosAplicados.map((filtro, idx) => (
                        <Button
                            key={idx}
                            title='Eliminar este filtro'
                            size='sm'
                            variant='dark'
                            className='boton m-2'
                            onClick={()=>setFiltro(filtro[0], filtro[1])}>
                            <XLg className='me-1'></XLg>
                            {filtro[1]}
                        </Button>
                    ))}
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