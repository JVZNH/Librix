import React from 'react';
import Home from "./pages/Home.jsx";
import Header from './components/Header.jsx';
import Contato from './pages/Contact.jsx'; 
import Alfabeto from './pages/Alfabeto.jsx';
import MeuFooter from "./components/MeuFooter.jsx";
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom';
export default function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/contato' element={<Contato/>}/>
      <Route path='/alfabeto' element={<Alfabeto/>}/>
      </Routes>

      <MeuFooter />
    </BrowserRouter>
  );
}
