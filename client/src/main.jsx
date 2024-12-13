import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router} from 'react-router-dom';
import StoreContextProvider from './context/StoreContext.jsx';

createRoot(document.getElementById('root')).render(
  <Router basename='/myonlinemeals/'>
    <StrictMode>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </StrictMode>
  </Router>
)
