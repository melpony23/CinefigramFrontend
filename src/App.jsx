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
import { PeliculaPage } from "./pages/PeliculaPage"
import LandingPage from './pages/LandingPage';
import Instrucciones from './pages/Instrucciones';
import Footer from './components/Footer/Footer';
import LandingPageUser from './pages/LadingPageUser';
import AuthProvider from './auth/AuthProvider';
import Perfil from './pages/Perfil';
import MiCuenta from './pages/MiCuenta';
import EditPelicula from './pages/EditPelicula'
import ChatRoom from './pages/ChatRoom';
import CreateChat from './pages/CreateChat';
import ChatList from './pages/ChatList';

function App() {
  return (
    <AuthProvider>
      <div className='App w-100'>
        <Navbar />
        <div className='w-100'>
          <Routes>
            <Route path='/nosotros' element={<Nosotros />} />
            <Route path='/peliculas' element={<Peliculas />} />
            <Route path='/login' element={<IniciarSesion />} />
            <Route path='/sign-up' element={<CrearCuenta />} />
            <Route path='/listas' element={<Listas />} />
            <Route path='/comunidad' element={<Comunidad />} />
            <Route path='/' element={<LandingPage />} />
            <Route path='/instrucciones' element={<Instrucciones />} />
            <Route path='/pelicula/:id' element={<PeliculaPage />} />
            <Route path='/pelicula/edit/:id' element={<EditPelicula/>} />
            <Route path='/landing-user' element={<LandingPageUser />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/mi-cuenta' element={<MiCuenta />} />
            <Route path="/chats" element={<ChatList />} />
            <Route path="/crear-chat" element={<CreateChat />} />
            <Route path="/chats/:id" element={<ChatRoom />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;