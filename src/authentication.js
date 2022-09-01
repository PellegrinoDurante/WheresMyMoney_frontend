import axios from "axios";
import React, { useState, useEffect, useContext } from "react";

const UserContext = React.createContext(null);

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function checkAuthentication() {
            const user = await checkLogin();
            setUser(user);
        }
    
        checkAuthentication();
      }, []);

    return (<UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>);
};

export async function checkLogin() {
    try {
        const response = await axios.post(process.env.REACT_APP_BACKEND_LOGIN_URL, null, {withCredentials: true});
        return response.data;
    } catch(e) {
        return null;
    }
}

export async function logout() {
    try {
        await axios.post(process.env.REACT_APP_BACKEND_LOGOUT_URL);
    } catch(e) {
       console.log(e);
    }
}

export function isAuthenticated(user) {
    return user !== null;
}

export function useUser() {
    return useContext(UserContext);
}