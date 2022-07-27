// import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

import { BrowserRouter as Router, Routes, Route, Redirect } from "react-router-dom";
 

import Login from "./components/login"
 

function App() {
  
  return (
    <div>
      <Router>
        <Routes>
        
          <Route path='/' element={<Login/>} />
          
  
        </Routes>

      </Router>

    </div>
  )
}

export default App;
