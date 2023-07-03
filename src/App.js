import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import Buscador from './components/Buscador';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Favoritos from './components/Favoritos';

function App() {

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

  return (
    <>
      <Header
        favoritos={favoritos}
      />
      <Routes>
        <Route
          path="/proyecto-final"
          element={
            <Main
              ofertas={ofertas}
              favoritos={favoritos}
              actualizarFavoritos={actualizarFavoritos}
            />
          }
        />
        <Route
          path="/proyecto-final/buscador"
          element={
            <Buscador
              favoritos={favoritos}
              actualizarFavoritos={actualizarFavoritos}
            />
          }
        />
        <Route
          path="/proyecto-final/favoritos"
          element={
            <Favoritos
              favoritos={favoritos}
              actualizarFavoritos={actualizarFavoritos}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
