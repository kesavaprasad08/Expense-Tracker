import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});



export const AuthContextProvider = (props) => {
  // useEffect(() => {
  //   console.log(AuthContext);
  // },[AuthContext])
  const initialToken = localStorage.getItem("token");

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;
  const loginHandler = (token) => {
    // console.log('login handler')
    setToken(token);
    localStorage.setItem("token", token);
    console.log('the user is successfully logged in')
    setTimeout(() => {
      logoutHandler();
    }, 300000);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
// console.log(userIsLoggedIn)
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;