import React from 'react';

// An object that contains a component
const AuthContext = React.createContext({
    isLoggedIn: false
});

export default AuthContext;