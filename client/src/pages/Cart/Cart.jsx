import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { url } from '../../config/config';
import './Cart.css';
import { toast } from 'react-toastify';

const Cart = ({ deliveryFee }) => {

  const { cartItems, removeFromCart, food_list, getTotalCartAmount } = useContext(StoreContext);

  const navigate = useNavigate();

  const checkout = () => {

    if (getTotalCartAmount()) {
      navigate('/order');
    }
    else {
      toast.error('Nothing to checkout!')
    }
  }

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        <br />
        {food_list.filter(item => cartItems[item._id] > 0).length === 0 
        ?<p style={{ display: 'flex', justifyContent: 'center', color: 'red', fontWeight: '500', marginBottom: '20px' }}>No cart items to display</p>
          : food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div className="cart-items-item" key={item._id}>
                  <img src={url + '/images/' + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>
                </div>
              );
            }
          })}
      </div>
      <hr />
      <div className="card-bottom">
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
          <button onClick={checkout}>Proceed To Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code,Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;