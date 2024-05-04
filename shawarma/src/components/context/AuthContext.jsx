import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            const loggedInData = localStorage.getItem('loggedIn');
            if (loggedInData) {
                const { loggedIn, expiration } = JSON.parse(loggedInData);
                if (loggedIn && new Date(expiration) > new Date()) {
                    setUserLoggedIn(true);
                } else {
                    localStorage.removeItem('loggedIn');
                    setUserLoggedIn(false);
                }
            }
        };

        checkLoginStatus();
        window.addEventListener('storage', checkLoginStatus); 

        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    const getToken = async (formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
    
        const body = {
            phone: formData.phoneNumber,
            password: formData.password
        };
    
        try {
            const responseToken = await axios.post('http://localhost:8000/api/accounts/token/', body, config);
    
            const access_token = responseToken.data.access;
            const refresh_token = responseToken.data.refresh;
    
            localStorage.setItem('access', access_token);
            localStorage.setItem('refresh', refresh_token);
        } catch (error) {
            console.error('Failed to fetch tokens:', error);
        }
    };

    const loginUser = async () => {
        const findItemAccess = () => localStorage.getItem('access')
        const findItemRefresh = () => localStorage.getItem('refresh')
        const access = await findItemAccess();
        const refresh = await findItemRefresh();

        const expirationTime = new Date().getTime() + 1000 * 60 * 60 * 24;
        const userData = JSON.stringify({ loggedIn: true, expiration: expirationTime });
        localStorage.setItem('loggedIn', userData);
        setUserLoggedIn(true);

        if (await access && await refresh){
            window.location.reload()
        }
    };



    const logoutUser = () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('phone')
        setUserLoggedIn(false);
        window.location.reload()
    };

    return (
        <AuthContext.Provider value={{ userLoggedIn, loginUser, logoutUser, getToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);