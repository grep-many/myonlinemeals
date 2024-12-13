import React, { useContext, useEffect, useState } from 'react';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import { StoreContext } from './context/StoreContext';

const App = () => {

  const { checkServerStatus, serverStatus, showLogin, setShowLogin, deliveryFee } = useContext(StoreContext);

  useEffect(() => {
    checkServerStatus();
  }, []);

  if (serverStatus === null) {
    // Show loading screen while checking server status
    return (
      <div className="loading error">
        <div className="loader"></div>
        <h2>Checking server status...</h2>
        <p>Please wait while we ensure everything is up and running.</p>
      </div>
    );
  }

  if (serverStatus === false) {
    // Show an error screen if the server is down
    return (
      <div className="loading error">
        <div className="loader"></div>
        <h2>Unable to connect to the server</h2>
        <p>We are having trouble connecting to our servers. Please try again later.</p>
        <button onClick={checkServerStatus}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />
      <div className='app'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/cart' element={<Cart deliveryFee={deliveryFee} />} />
          <Route exact path='/order' element={<PlaceOrder deliveryFee={deliveryFee} setShowLogin={setShowLogin} />}></Route>
          <Route exact path='/myorders' element={<MyOrders />}></Route>
          <Route exact path='/verify' element={<Verify />}></Route>
          <Route exact path='*' element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
