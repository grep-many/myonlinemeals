import { createContext, useEffect, useState } from "react";
import { url } from '../config/config'
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [serverStatus, setServerStatus] = useState(null);
    const [token, setToken] = useState('' || localStorage.getItem('token'));
    const [food_list, setFoodList] = useState([]);
    const [showLogin, setShowLogin] = useState(false);
    const deliveryFee = 2;

    const checkServerStatus = async () => {
        try {
            const response = await axios.get(url+'/'); // Adjust the URL based on your backend
            if (response.data.success) {
                setServerStatus(true);
            } else {
                setServerStatus(false);
            }
        } catch (error) {
            console.error('Server is not responsive:', error);
            setServerStatus(false);
        }
    };

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = (itemId) => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const loadCartData = async (token) => {
        if (token) {
            const response = await axios.post(url + '/api/cart/get', {}, { headers: { token } });
            setCartItems(response.data.cartData);
        }
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + '/api/food/list');
        if (response.data.success) {
            setFoodList(response.data.data);
        }
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem('token'));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        checkServerStatus,
        serverStatus,
        showLogin,
        setShowLogin,
        deliveryFee,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;