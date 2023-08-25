
import React from 'react';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
function App() {

  
  return (
  <Router>
      <Login/>
  </Router>
  );
}

export default App;
