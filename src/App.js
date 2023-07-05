import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import Buscador from './components/Buscador';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Favoritos from './components/Favoritos';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  //Persistencia local de los favoritos
  let productosFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  if (!productosFavoritos) {
    productosFavoritos = []
  };

  useEffect(() => {
    productosFavoritos ?
      localStorage.setItem('favoritos', JSON.stringify(favoritos))
      : localStorage.setItem('favoritos', JSON.stringify([]))
  }, [productosFavoritos]);

  //State para lista de favoritos
  const [favoritos, actualizarFavoritos] = useState(productosFavoritos);

  //Fetch asincrónico parametrizado con log a consola
  //Recibe url, función que edita un estado, y el estado
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
  State para lista a mostrar cuando se busca un juego
  En root porque la usa tanto el buscador en el header como el de componente buscador
  */
  const [ofertasBuscado, editarOfertasBuscado] = useState([]);

  /*
 Fetch asincrónico para triggerear cuando se hace enter o click en buscar
 Trae la lista de juegos que incluyen "nombre"
 */
  const buscarOfertasDeJuego = async (nombre) => {
    fetchAsync(
      "https://www.cheapshark.com/api/1.0/games?title=" + nombre, 
      editarOfertasBuscado,
      ofertasBuscado
      );
  }

  //State para el user input en el buscador
  const [juegoABuscar, editarJuegoABuscar] = useState("");

  //Función que toma el valor ingresado y lo guarda en el state
  const handleChange = (e) => {
    editarJuegoABuscar(e.target.value);
  };

  //Función para notificar, recibe el mensaje como parámetro
  const notify = (mensaje) => {
    toast(mensaje, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <>
      <Header
        juegoABuscar={juegoABuscar}
        handleChange={handleChange}
        buscarOfertasDeJuego={buscarOfertasDeJuego}
        favoritos={favoritos}
      />
      <Routes>
        <Route
          path="/proyecto-final"
          element={
            <Main
              favoritos={favoritos}
              actualizarFavoritos={actualizarFavoritos}
              notify={notify}
              fetchAsync={fetchAsync}
            />
          }
        />
        <Route
          path="/proyecto-final/buscador"
          element={
            <Buscador
              juegoABuscar={juegoABuscar}
              handleChange={handleChange}
              buscarOfertasDeJuego={buscarOfertasDeJuego}
              ofertasBuscado={ofertasBuscado}
              favoritos={favoritos}
              actualizarFavoritos={actualizarFavoritos}
              notify={notify}
            />
          }
        />
        <Route
          path="/proyecto-final/favoritos"
          element={
            <Favoritos
              favoritos={favoritos}
              actualizarFavoritos={actualizarFavoritos}
              notify={notify}
            />
          }
        />
      </Routes>
      <Footer />
      {/** Componente para notificaciones, gracias a github.com/fkhadra */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
