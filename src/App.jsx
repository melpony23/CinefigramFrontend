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
import PerfilId from './pages/PerfilId';
import MiCuenta from './pages/MiCuenta';
import EditPelicula from './pages/EditPelicula'
import ListasUser from './pages/ListasUser';
import CrearLista from './pages/CrearLista'
import EditReview from './pages/EditReview';
import ChatRoom from './pages/ChatRoom';
import CreateChat from './pages/CreateChat';
import ChatList from './pages/ChatList';
import SearchResults from './pages/SearchResults'
import CommentPage from './pages/CommentPage';
import EditComment from './pages/EditComment';
import EditarLista from './pages/EditarLista';
import VerLista from './pages/VerLista';

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
            <Route path='/pelicula/edit/:id' element={<EditPelicula />} />
            <Route path='/landing-user' element={<LandingPageUser />} />
            <Route path='/perfil-propio/:id' element={<Perfil />} />
            <Route path='/mi-cuenta' element={<MiCuenta />} />
            <Route path='/listas-user/:id' element={<ListasUser />} />
            <Route path='/crear-lista/:id' element={<CrearLista />} />
            <Route path='/review/:id' element={<EditReview/>} />
            <Route path='/perfil/:id' element={<PerfilId />} />
            <Route path="/chats" element={<ChatList />} />
            <Route path="/crear-chat" element={<CreateChat />} />
            <Route path="/chats/:id" element={<ChatRoom />} />
            <Route path="peliculas/search/:searchTerm" element={<SearchResults />} />
            <Route path="/Comments/:id" element={<CommentPage />} />
            <Route path="/comment/edit/:id" element={<EditComment />} />
            <Route path="/lista/:id" element={<VerLista/>}/>
            <Route path="/lista/edit/:id" element={<EditarLista/>}/>
            
              
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;