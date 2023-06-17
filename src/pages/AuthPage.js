import { useState, useRef,useContext } from "react";

import {useHistory} from 'react-router-dom'

import classes from "./AuthForm.module.css";
import AuthContext from "../store/auth-context";

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
const ConfirmPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, loading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    loading(true);
    event.preventDefault();
    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBIutYQxemEvfAy3NV3Cxty0b_12wNrU0";
      loading(false);
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBIutYQxemEvfAy3NV3Cxty0b_12wNrU0";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          loading(false);
          return res.json();
        } else {
          loading(false);
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed!";

            alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        // console.log('hi')
         history.replace('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
          {!isLogin && (<><label htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            type="password"
            id="ConfirmPassword"
            required
            ref={ConfirmPasswordInputRef}
          /></>)}
        </div>
        <div className={classes.actions}>
          {isLoading ? <p>Sending Request...</p> : <button>Submit</button>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Have an Account ? Login"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;