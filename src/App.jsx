import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { CrearCuenta } from './pages/CrearCuenta';
import { IniciarSesion } from './pages/IniciarSesion';
import { Listas } from './pages/Listas';
import { Comunidad } from './pages/Comunidad';
import { Peliculas } from './pages/Peliculas';
import { Nosotros } from './pages/Nosotros';
import LandingPage from './pages/LandingPage';
import Instrucciones from './pages/Instrucciones';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='content'>
        <Routes>
          <Route path='/nosotros' element={<Nosotros />} />
          <Route path='/peliculas' element={<Peliculas />} />
          <Route path='/login' element={<IniciarSesion />} />
          <Route path='/sign-up' element={<CrearCuenta />} />
          <Route path='/listas' element={<Listas />} />
          <Route path='/comunidad' element={<Comunidad />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/instrucciones' element={<Instrucciones />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// const [count, setCount] = useState(0)
{/* <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
    </div> */}
