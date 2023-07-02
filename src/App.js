import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import Juego from './components/Juego';
import { Container, Row } from 'react-bootstrap';
import Buscador from './components/Buscador';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';

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

  return (
    <>
      <Header
        favoritos={favoritos}
      />
      <Routes>
        <Route
          path="/proyecto-final"
          element={
            <Main/>
          }
        />
      </Routes>
    </>
  );
}

export default App;
