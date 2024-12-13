import { assets } from '../../assets/assets';
import './LoginPopup.css'
import './UserConfirmBox.css'
import React, { useContext } from 'react';
import { toast } from 'react-toastify'
import axios from 'axios';
import { url } from '../../config/config'
import { StoreContext } from '../../context/StoreContext';

const UserConfirmBox = ({ setUserConfirmBox, }) => {

    const { token, setToken } = useContext(StoreContext);

    const handleSubmit = async (userChoose) => {
        if (!userChoose) {
            setUserConfirmBox(false);
            return;
        }

        try {
            const response = await axios.delete(`${url}/api/user/delete`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send token for authentication
                },
            });

            if (response.data.success) {
                setToken('');
                localStorage.removeItem('token');
                setUserConfirmBox(false);
                toast.success('User deleted successfully');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error('Failed to delete user. Please try again.');
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={e => e.preventDefault()} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>Are you sure you want to delete your account?</h2>
                    <img src={assets.cross_icon} alt="" onClick={() => setUserConfirmBox(false)} />
                </div>
                <div className="flex-row">
                    <button type='button' onClick={() => handleSubmit(true)}>Yes</button>
                    <button type='button' onClick={() => handleSubmit(false)}>No</button>
                </div>
            </form>
        </div>
    );
}

export default UserConfirmBox;
