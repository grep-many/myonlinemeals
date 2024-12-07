import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { url } from '../../config/config';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = ({ deliveryFee ,setShowLogin}) => {

  const { getTotalCartAmount, token, food_list, cartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const hadleOnChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryFee
    }

    try {
      let response = await axios.post(url + '/api/order/place', orderData, { headers: { token } })

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
        toast.success('Processing')
      } else {
        toast.error('Processing failed!')
      }
    }
    catch (err) {
      toast.error('Something went wrong!')
    } finally {
      localStorage.setItem('orderData', JSON.stringify(data));
    }
  }

  useEffect(() => {
    if (!token) {
      toast.error('Login before checkout!');
      navigate('/cart');
      setShowLogin(true);
    }
    const savedData = JSON.parse(localStorage.getItem('orderData'));
    if (savedData) {
      setData(savedData);
    }
  }, []);

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First name' onChange={hadleOnChange} name='firstName' value={data.firstName} required />
          <input type="text" placeholder='Last name' onChange={hadleOnChange} name='lastName' value={data.lastName} required />
        </div>
        <input type="email" placeholder="Email address" onChange={hadleOnChange} name='email' value={data.email} required />
        <input type="text" placeholder="Street" onChange={hadleOnChange} name='street' value={data.street} required />
        <div className="multi-fields">
          <input type="text" placeholder='City' onChange={hadleOnChange} name='city' value={data.city} required />
          <input type="text" placeholder='State' onChange={hadleOnChange} name='state' value={data.state} required />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip code' onChange={hadleOnChange} name='zipcode' value={data.zipcode} required />
          <input type="text" placeholder='Country' onChange={hadleOnChange} name='country' value={data.country} required />
        </div>
        <input type="tel" placeholder='Phone' onChange={hadleOnChange} name='phone' value={data.phone} required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryFee}</b>
            </div>
          </div>
          <button>Proceed To Pay</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
