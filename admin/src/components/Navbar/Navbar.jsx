import { assets } from '../../assets/assets';
import './Navbar.css'
import React from 'react';

const Navbar = () => {
  return (
    <>
      <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <img className='profile' src={assets.profile_image} alt="" />
      </div>
      <hr />
    </>
  );
}

export default Navbar;
