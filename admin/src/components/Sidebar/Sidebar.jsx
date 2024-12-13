import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './Sidebar.css'
import React from 'react';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/' className="sidebar-option">
                <img src={assets.parcel_icon} alt="" style={{height:'28px'}}/>
                <p>Orders</p>
            </NavLink>
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Item</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List Item</p>
            </NavLink>
        </div>
      
    </div>
  );
}

export default Sidebar;
