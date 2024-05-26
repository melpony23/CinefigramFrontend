import React from 'react';
import './landing_page.css';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { CrearCuenta } from './components/pages/CrearCuenta';
import { IniciarSesion } from './components/pages/IniciarSesion';
import { Listas } from './components/pages/Listas';
import { Comunidad } from './components/pages/Comunidad';
import { Peliculas } from './components/pages/Peliculas';
import { Nosotros } from './components/pages/Nosotros';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/nosotros' element={<Nosotros />} />
        <Route path='/peliculas' element={<Peliculas />} />
        <Route path='/login' element={<IniciarSesion />} />
        <Route path='/sign-up' element={<CrearCuenta />} />
        <Route path='/listas' element={<Listas />} />
        <Route path='/comunidad' element={<Comunidad />} />
      </Routes>
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
