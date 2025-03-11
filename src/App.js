// react
//import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// pages
import Home from './pages/home/Home'
import Battle from './pages/battle/Battle'
import Collection from './pages/collection/Collection'
import Store from './pages/store/Store'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='/battle' element={<Battle />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/store' element={<Store />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;