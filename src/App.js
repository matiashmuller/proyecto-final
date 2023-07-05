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

  let productosFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  if (!productosFavoritos) {
    productosFavoritos = []
  };

  const [favoritos, actualizarFavoritos] = useState(productosFavoritos);

  useEffect(() => {
    productosFavoritos ?
      localStorage.setItem('favoritos', JSON.stringify(favoritos))
      : localStorage.setItem('favoritos', JSON.stringify([]))
  }, [productosFavoritos]);

  const [ofertasBuscado, editarOfertasBuscado] = useState([]);

  const buscarOfertasDeJuego = async (nombre) => {
      try {
          const api = await fetch("https://www.cheapshark.com/api/1.0/games?title=" + nombre);
          const resultado = await api.json();
          editarOfertasBuscado(resultado);
          console.log(ofertasBuscado)
      } catch (error) {
          console.log(error);
      };
  }

  const [juegoABuscar, editarJuegoABuscar] = useState("");

  const handleChange = (e) => {
      editarJuegoABuscar(e.target.value);
  };

  const notify = (mensaje) => {
    toast(mensaje, {
        position: "bottom-center",
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
        juegoABuscar = {juegoABuscar}
        handleChange = {handleChange}
        buscarOfertasDeJuego = {buscarOfertasDeJuego}
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
            />
          }
        />
        <Route
          path="/proyecto-final/buscador"
          element={
            <Buscador
              juegoABuscar = {juegoABuscar}
              handleChange = {handleChange}
              buscarOfertasDeJuego = {buscarOfertasDeJuego}
              ofertasBuscado = {ofertasBuscado}
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
      <Footer/>
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
