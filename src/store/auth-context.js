import React, { useState, useEffect } from 'react';

// An object that contains a component
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Collects the 'isLoggedIn' key from local storage, storing it in a variable
    // updates the isLoggedIn state to true if evaluates to 1
    useEffect(() => {
        const authStatus = localStorage.getItem("isLoggedIn");

        if (authStatus === "1") {
        setIsLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext;