// react
//import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// pages
import Battle from './pages/battle/Battle'
import Collection from './pages/collection/Collection'
import Store from './pages/store/Store'
import Character from './pages/character/Character'
import Game from './pages/game/Game'
import EndGame from './pages/endGame/EndGame'

//components
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><Navbar /><Battle /></>} />
          <Route path='/collection' element={<><Navbar /><Collection /></>} />
          <Route path='/store' element={<><Navbar /><Store /></>} />
          <Route path='/character/:name' element={<Character />} />
          <Route path='/game' element={<Game />} />
          <Route path="/end" element={<EndGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;