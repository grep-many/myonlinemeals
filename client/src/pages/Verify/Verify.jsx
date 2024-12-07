import { useNavigate, useSearchParams } from 'react-router-dom';
import './Verify.css'
import React, { useContext, useEffect } from 'react';
import { url } from '../../config/config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const {token} = useContext(StoreContext);

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const navigate = useNavigate();

    const verifyPayment = async () => {
    
        const response = await axios.post(url + "/api/order/verify", { success, orderId },{headers:{token}});
    
        if (response.data.success) {
            navigate("/myorders");
            toast.success("Order Placed Successfully");
        } else {
            toast.error("Order Cancelled, something went wrong");
            navigate("/");
        }
    };
    


    useEffect(() => {
        verifyPayment();
    }, [])

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    );
}

export default Verify;
