import React, { useState } from 'react'
import Signup from './Features/Auth/signupForm';
import Login from './Features/Auth/LoginForm';

const Auth = () => {
    const [auth, setAuth] = useState("signup");
    return (
      <>
        { auth == "login" && <Login setAuth={setAuth} />}
        { auth == "signup" && <Signup setAuth={setAuth} /> }
      </>

  )
};

export default Auth;
