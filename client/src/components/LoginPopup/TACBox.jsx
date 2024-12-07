import { assets } from '../../assets/assets';
import './LoginPopup.css'
import './UserConfirmBox.css'
import './TAC.css'
import React from 'react';

const TACBox = ({ setTAC ,setTACCheck}) => {

    const handleSubmit=(user)=>{
        setTACCheck(user);
        setTAC(false);
    }

    return (
        <div className='login-popup' style={{ zIndex: 100 }}>
            <form onSubmit={e => e.preventDefault()} className="login-popup-container" style={{ width: 'max(38vw, 350.9px)' }}>
                <div className="login-popup-title">
                    <h2>Terms and Conditions</h2>
                    <img src={assets.cross_icon} alt="" onClick={() => setTAC(false)} />
                </div>
                <p>Welcome to <b>MyOnlineMeals</b>! By using this website, you agree to the following terms and conditions:</p>
                <div className="content">

                    <h3>1. Use of Cookies</h3>
                    <p>
                        This website uses cookies to enhance your browsing experience and save your preferences. By continuing to
                        browse, you consent to the use of cookies in accordance with our policy. If you do not agree, you can disable
                        cookies in your browser settings. Please note, some features may not function properly without cookies.
                    </p>

                    <h3>2. Prototype Disclaimer</h3>
                    <p>
                        This website is a <b>prototype</b> for demonstration purposes only. It is <b>not a production-ready platform</b>.
                    </p>
                    <p>
                        <b>Do not use real credit or debit card information.</b> Instead, use the following demo card details:
                    </p>
                    <ul>
                        <li>Card Number: <b>4242 4242 4242 4242</b></li>
                        <li>Expiration Date: Any future date</li>
                        <li>CVV: Any 3-digit number</li>
                    </ul>

                    <h3>3. Limitation of Liability</h3>
                    <p>
                        We are not responsible for any errors, inaccuracies, or losses resulting from the use of this website. The
                        content and features are for testing purposes only.
                    </p>
                </div>
                <div className="flex-row">
                    <button type='button' onClick={() => handleSubmit(true)}>Accept</button>
                    <button type='button' onClick={() => handleSubmit(false)}>Reject</button>
                </div>
            </form>
        </div>
    );
}

export default TACBox;
