import { assets } from '../../assets/assets';
import './LoginPopup.css'
import './UserConfirmBox.css'
import React, { useContext } from 'react';
import { toast } from 'react-toastify'
import axios from 'axios';
import { url } from '../../config/config'
import { StoreContext } from '../../context/StoreContext';

const ConfirmToRemove = ({ setShowConfirmRemove, fetchOrders, removeData }) => {

    const { token } = useContext(StoreContext);
    const remove = removeData.status === 'Delivered' ? true : false;

    // const handleRemove = async (orderId, status) => {
    const handleRemove = async (userChoose, data = {}) => {
        if (!userChoose) {
            setShowConfirmRemove(false);
            return;
        }

        const { orderId, status } = data;

        const response = await axios.post(`${url}/api/order/remove`, { orderId }, {
            headers: { token }
        });

        if (response.data.success) {
            await fetchOrders();
            toast.success(`${status === 'Delivered' ? 'Removed' : 'Canceled'} successfully`)
        } else {
            toast.error(`Something went wrong while ${status === 'Delivered' ? 'Removing' : 'Canceling'} orders`)
        }
        setShowConfirmRemove(false);
    }

    return (
        <div className='login-popup'>
            <form onSubmit={e => e.preventDefault()} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>Are you sure want to {remove ? 'remove' : 'cancel'} order?</h2>
                    <img src={assets.cross_icon} alt="" onClick={() => setShowConfirmRemove(false)} />
                </div>
                <div className="flex-row">
                    <button type='button' onClick={() => handleRemove(true, removeData)}>Yes</button>
                    <button type='button' onClick={() => handleRemove(false)}>No</button>
                </div>
            </form>
        </div>
    );
}

export default ConfirmToRemove;