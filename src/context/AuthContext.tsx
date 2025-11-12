import React, { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const login = (username, password) => {
        if (username === 'admin' && password === '123') {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const Protected = ({ children }) => {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace={true} />; 
    }
    
    return children;
};

export const useAuth = () => {
    return useContext(AuthContext);
};