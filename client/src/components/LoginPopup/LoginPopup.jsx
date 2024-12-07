import { assets } from '../../assets/assets';
import './LoginPopup.css'
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify'
import axios from 'axios';
import { url } from '../../config/config'
import { StoreContext } from '../../context/StoreContext';
import TACBox from './TACBox';

const LoginPopup = ({ setShowLogin }) => {

    const [currentState, setCurrentState] = useState('Sign Up');
    const [TACCheck, setTACCheck] = useState(false);
    const [TAC, setTAC] = useState(false);
    const { setToken } = useContext(StoreContext);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
    });

    const hadleOnChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentState === 'Sign In' && (data.password !== data.cpassword)) {
            toast.error('Password and Confirm Password should be same')
            return;
        }

        let newUrl = `${url}/api/user/`;
        if (currentState === 'Log In') {
            newUrl += 'login'
        } else {
            newUrl += 'register'
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            setShowLogin(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    }


    return (
        <>
            {TAC && <TACBox setTAC={setTAC} setTACCheck={setTACCheck}/>}
            <div className='login-popup'>
                <form onSubmit={handleSubmit} className="login-popup-container">
                    <div className="login-popup-title">
                        <h2>{currentState}</h2>
                        <img src={assets.cross_icon} alt="" onClick={() => setShowLogin(false)} />
                    </div>
                    <div className="login-popup-inputs">
                        {currentState === 'Sign Up' && <input type="text" placeholder='Your name' required onChange={hadleOnChange} name='name' value={data.name} />}
                        <input type="email" placeholder='Your email' required onChange={hadleOnChange} name='email' value={data.email} />
                        <input type="password" placeholder='Your password' required onChange={hadleOnChange} name='password' value={data.password} />
                        {currentState === 'Sign Up' && <input type="password" placeholder='Confirm Password' required onChange={hadleOnChange} name='cpassword' value={data.cpassword} />}
                    </div>
                    <button type='submit'>{currentState === 'Sign Up' ? 'Create account' : 'Login'}</button>
                    <div className="login-pop-up-condition" style={{ textAlign: 'center', display: 'block' }}>
                        <input
                            id='tac'
                            type="checkbox"
                            required
                            checked={TACCheck} // Bind the checkbox value to the state
                            onChange={(e)=>setTACCheck(e.target.checked)} // Update the state when the checkbox is clicked
                        />
                        <label htmlFor='tac'>By continuing, i agree to the</label><br /><span className='tac' onClick={() => setTAC(true)}>terms of use & policy.</span>
                    </div>
                    {currentState === 'Log In' ?
                        <p style={{ textAlign: 'center' }}>Create a new account? <span onClick={() => setCurrentState('Sign Up')}>here</span></p>
                        : <p style={{ textAlign: 'center' }}>Already hava an account?<span onClick={() => setCurrentState('Log In')}>here</span></p>
                    }
                </form>
            </div>
        </>
    );
}

export default LoginPopup;
