
import React from 'react';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup'
import PlanSelection from './components/PlanSelection';
import Payment from './components/Payment';
import PlanStatus from './components/PlanStatus';

function App() {

  const host="http://localhost:5000"
  return (
  <Router>

     <Routes>

     <Route exact path='/' element={<Signup host={host}/>}/>
     <Route exact path='/signup' element={<Signup host={host} />}/>
     <Route exact path='/login' element={<Login host={host}/>}/>
     <Route exact path='/planSelection' element={<PlanSelection host={host}/>}/>
     <Route exact path='/payment' element={<Payment host={host}/>}/>
     <Route exact path='/planStatus' element={<PlanStatus host={host}/>}/>
     <Route/>
     </Routes>
   
  </Router>
  );
}

export default App;
