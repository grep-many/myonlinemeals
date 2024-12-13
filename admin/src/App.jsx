import React, { useContext } from 'react';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from './context/StoreContext';

const App = () => {

  const { serverStatus } = useContext(StoreContext);


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
      <Navbar />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route exact path='/' element={<Orders />}></Route>
          <Route exact path='/list' element={<List />} />
          <Route exact path='/add' element={<Add />} />
          <Route exact path='*' element={<Orders />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
