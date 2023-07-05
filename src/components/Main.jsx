import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, NavDropdown, Row } from 'react-bootstrap';
import { CheckLg, XLg } from 'react-bootstrap-icons';
import Juego from './Juego';

const Main = ({ favoritos, actualizarFavoritos, notify, fetchAsync }) => {

    //url predeterminada para fetch en const, evita mucha repetición
    const urlPredet = 'https://www.cheapshark.com/api/1.0/deals?'

    //State que se va a renderizar
    const [ofertas, editarOfertas] = useState([]);

    //Fetch inicial automático para traer la lista de ofertas "destacadas", con log a consola
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

    /*
    State para controlar la url a la que se quiera hacer fetch con los filtros
    Inicialmente seteado en la url predeterminada, cada elección de filtro agrega lo necesario
    */
    const [urlFiltro, editarUrlFiltro] = useState(urlPredet);

    //Función para aplicar los filtros y orden seleccionados, al hacer click en botón check
    const aplicarFiltrosYOrden = () => {
        fetchAsync(urlFiltro, editarOfertas, ofertas)
        console.log(urlFiltro)
        notify("¡Filtros aplicados!")
    }

    //State para gardar las tiendas, inicialmente vacío
    const [tiendas, editarTiendas] = useState([]);

    /*
    Función para fetch de las tiendas disponibles al hacer click en dicho subítem
    del dropdown
     */
    const getTiendas = () => {
        fetchAsync('https://www.cheapshark.com/api/1.0/stores', editarTiendas, tiendas)
    }

    //State para controlar los filtros aplicados y mapear botones
    const [filtrosAplicados, editarFiltrosAplicados] = useState([]);

    /*
    Función de acción al clickear un filtro
    Si el filtro no está seleccionado, lo agrega a los aplicados, caso contrario elimina
    */
    const setFiltro = (sumaURL, nombreFiltro) => {
        const filtroNuevo = filtrosAplicados.find(filtro=>filtro[1]===nombreFiltro)
        if (filtroNuevo===undefined) {
            agregarFiltro(sumaURL,nombreFiltro);
        } else {
            eliminarFiltro(sumaURL,nombreFiltro);
        }
    }

    /*
    Agregado y eliminado de filtros:
    Fue necesario que cada filtro sea un array en forma de [urlCorrespondiente, nombreDelFiltro]
    para implementar la funcionalidad de setFiltro cuando se clickea el botón del mismo

    Agrega un filtro, de la siguiente manera:
    Edita el state "urlFiltro", sumándole la parte correspondiente al nuevo filtro
    Edita los filtros aplicados, agregando el nuevo filtro en forma de array[urlCorrespondiente, nombreDelFiltro]
    */
    const agregarFiltro = (sumaURL, nombreFiltro) => {
        editarUrlFiltro(urlFiltro + sumaURL);
        editarFiltrosAplicados([...filtrosAplicados, [sumaURL, nombreFiltro]]);
    }

    /*
    Elimina un filtro, de la siguiente manera:
    Edita el state "urlFiltro", borrando su parte correspondiente en la misma.
    Edita los filtros aplicados, asignando a "filtrosAplicados" el resultado del filter,
        que busca todos los "nombre de filtro" distintos al que se quiere eliminar.
    */
    const eliminarFiltro = (sumaURL, nombreFiltro) => {
        editarUrlFiltro(urlFiltro.replace(sumaURL, ""));
        editarFiltrosAplicados(filtrosAplicados.filter(filtro=>filtro[1]!==nombreFiltro));
    }

    /*
    Elimina todos los filtros, simplemente volviendo a asignar la url predeterminada
    a "urlFiltro", y asignando un array vacío a "filtrosAplicados" 
    */
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
                            {/**Subdropdown tiendas 
                             * Hace fetch al hacer click para traer las tiendas,
                             * luego mapea los nombres de las mismas y aprovecha
                             * también el id para completar la argumentación de setFiltro
                            */}
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
                        {/**Botón aplicar y eliminar filtros*/}
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
                {/**Botones indicadores de filtros 
                 * Se logran mapeando el state filtrosAplicados
                 * Al hacer click se eliminan a sí mismos (con setFiltro)
                */}
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