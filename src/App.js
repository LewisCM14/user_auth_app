import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Collects the 'isLoggedIn' key from local storage, storing it in a variable
  // updates the isLoggedIn state to true if evaluates to 1
  useEffect(() => {
    const authStatus = localStorage.getItem("isLoggedIn");

    if (authStatus === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // Stores the 'isLoggedIn' key in the browsers local storage with a value of 1
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  // deletes the 'isLoggedIn' key from local storage upon log out
  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn'); 
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider 
        value={{
            isLoggedIn: isLoggedIn, 
        }}
    >
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
