// import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { authActions } from "../../../../redux/auth";

import classes from "./MainNavigation.module.css";
// import AuthContext from "../../../../store/auth-context";

const MainNavigation = () => {
  const dispatch = useDispatch();
  
  const history = useHistory();
  // const authCtx = useContext(AuthContext);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);


  // console.log(authCtx)

  const logOutHandler = () => {
    dispatch(authActions.logout());
    // authCtx.logout();
    history.replace("/auth");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>My Web Link</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/expense">Expense Tracker</Link>
            </li>
          )}

          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/aboutus">About us</Link>
          </li>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
