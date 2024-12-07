import { createContext, useEffect, useState } from "react";
import { url } from '../config/config'
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [serverStatus, setServerStatus] = useState(null);

    const checkServerStatus = async () => {
        try {
            const response = await axios.get(url + '/'); // Adjust the URL based on your backend
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

    useEffect(() => {
        checkServerStatus();
    }, []);

    const contextValue = {
        serverStatus,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;