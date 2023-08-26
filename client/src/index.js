import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import './index.css';
import axios from 'axios'
import App from './App';

  const rootElement = document.getElementById('root');
  const root = createRoot(rootElement);
  

  const stripePromise=loadStripe(process.env.REACT_APP_KEY)
  // 👇️ if you use TypeScript, add non-null 
  
  root.render(
    <StrictMode>
      <Elements stripe={stripePromise}>
      <App />
      </Elements>
      
    </StrictMode>,
  );





