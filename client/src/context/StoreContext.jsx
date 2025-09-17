import { createContext, useEffect, useState } from "react";
import { url } from "../config/config";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [serverStatus, setServerStatus] = useState(null);
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const deliveryFee = 2;

  // ✅ Helper to safely call token-protected APIs
  const tokenValidation = async (apiCall) => {
    try {
      return await apiCall();
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.clear();
        setToken("");
        window.location.href="/"
      }
    }
  };

  // 🔹 Check if backend is alive
  const checkServerStatus = async () => {
    try {
      const response = await axios.get(url + "/");
      if (response.data.success) {
        setServerStatus(true);
      } else {
        setServerStatus(false);
      }
    } catch (error) {
      console.error("Server is not responsive:", error);
      setServerStatus(false);
    }
  };

  // 🔹 Add item to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      await tokenValidation(() =>
        axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        )
      );
    }
  };

  // 🔹 Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    if (token) {
      await tokenValidation(() =>
        axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        )
      );
    }
  };

  // 🔹 Calculate total price
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // 🔹 Load cart data from backend
  const loadCartData = async (token) => {
    if (token) {
      const response = await tokenValidation(() =>
        axios.post(url + "/api/cart/get", {}, { headers: { token } })
      );
      setCartItems(response.data.cartData);
    }
  };

  // 🔹 Fetch food list (public, no token required)
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    if (response.data.success) {
      setFoodList(response.data.data);
    }
  };

  // 🔹 Initial data load
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
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
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
