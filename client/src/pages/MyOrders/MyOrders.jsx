import { toast } from "react-toastify";
import { url } from "../../config/config";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./MyOrders.css"
import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import ConfirmToRemove from "../../components/LoginPopup/ConfirmToRemove";

const MyOrders = () => {

    const [data, setData] = useState([]);
    const [showConfirmRemove, setShowConfirmRemove] = useState(false);
    const [removeData, setRemoveData] = useState({});
    const { token } = useContext(StoreContext);

    const fetchOrders = async () => {
        const response = await axios.post(`${url}/api/order/userorders`, {}, {
            headers: { token }
        });

        if (response.data.success) {
            setData(response.data.data);
        } else {
            toast.error('Something went wrong while fetching user orders')
        }
    }

    const handleRemoveClick = (data) => {
        setRemoveData(data);
        setShowConfirmRemove(true);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <>
            {showConfirmRemove && <ConfirmToRemove setShowConfirmRemove={setShowConfirmRemove} fetchOrders={fetchOrders} removeData={removeData} />}
            <div className="my-orders">
                <h2>Orders</h2>
                <div className="container">
                    {!data.length ?
                        <p style={{ display: 'flex', justifyContent: 'center', color: 'red', fontWeight: '500' }}>No Order's to display</p>
                        : data.map((order, index) => {
                            return (
                                <div key={index} className="my-orders-order">
                                    <img src={assets.parcel_icon} alt="" />
                                    <p>
                                        {order.items.map((item, index) => {
                                            if (index === order.items.length - 1) {
                                                return item.name + " X " + item.quantity;
                                            } else {
                                                return item.name + " X " + item.quantity + ",";
                                            }
                                        })}
                                    </p>
                                    <p>${order.amount}.00</p>
                                    <p>items: {order.items.length}</p>
                                    <p>
                                        <span className={order.status === 'Delivered' ? 'delivered' : ''}>&#x25cf;</span>
                                        <b> {order.status}</b>
                                        {/* <button onClick={() => handleRemove(order._id, order.status)} className="remove">{order.status === 'Delivered' ? 'Remove' : 'Cancel'}</button> */}
                                        <button onClick={() => handleRemoveClick({ orderId: order._id, status: order.status })} className="remove">{order.status === 'Delivered' ? 'Remove' : 'Cancel'}</button>
                                    </p>
                                    <button onClick={fetchOrders}>Track Order</button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}

export default MyOrders;
