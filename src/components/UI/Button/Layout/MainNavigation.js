import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { authActions } from "../../../../redux/auth";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logOutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/auth");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>R K P Expense Tracker</div>
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
          {isLoggedIn && (
            <li>
              <Link to="/welcome">Profile</Link>
            </li>
          )}

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
