
import React,{useState} from 'react';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup'
import PlanSelection from './components/PlanSelection';
import Payment from './components/Payment';
import PlanStatus from './components/PlanStatus';
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [progress, setProgress] = useState(0)
  // const host="https://subscription-7z2.onrender.com"
  const host="https://subscribehelp-1-x4073048.deta.app"
  const notify=(message)=>toast(message);
  return (
  <Router>
        <LoadingBar
        color='white'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <ToastContainer/>
     <Routes>

     <Route exact path='/' element={<Signup notify={notify} setProgress={setProgress} host={host}/>}/>
     <Route exact path='/signup' element={<Signup notify={notify} setProgress={setProgress} host={host} />}/>
     <Route exact path='/login' element={<Login notify={notify} setProgress={setProgress} host={host}/>}/>
     <Route exact path='/planSelection' element={<PlanSelection notify={notify} setProgress={setProgress} host={host}/>}/>
     <Route exact path='/payment' element={<Payment notify={notify} setProgress={setProgress} host={host}/>}/>
     <Route exact path='/planStatus' element={<PlanStatus notify={notify} setProgress={setProgress} host={host}/>}/>
     <Route/>
     </Routes>
   
  </Router>
  );
}

export default App;
