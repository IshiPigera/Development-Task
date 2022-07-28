
import React, { Component } from 'react';

import { BrowserRouter as Router, Routes, Route, Redirect } from "react-router-dom";
 

import Login from "./components/login"
import Home from "./pages/home"
import CreateUser from "./pages/createUser"
 

function App() {
  
  return (
    <div>
      <Router>
        <Routes>
        
          <Route path='/' element={<Login/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/createUser' element={<CreateUser/>} />
  
        </Routes>

      </Router>

    </div>
  )
}

export default App;
