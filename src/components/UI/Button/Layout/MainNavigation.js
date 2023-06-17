import { useContext } from "react";
import {useHistory} from 'react-router-dom'
import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import AuthContext from "../../../../store/auth-context";

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  // console.log(authCtx)

  const logOutHandler = () => {
    authCtx.logout();
    history.replace('/auth')
  };

  return (
    <header className={classes.header}>
        
        
      <Link to="/">
        <div className={classes.logo}>My Web Link</div>
      </Link>
      <nav>
        <ul>
          
            <>
            <li>
              <Link to="/">Home</Link>
            </li>
            
        </>
         
          
            <>  
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/aboutus">About us</Link>
            </li>
            <li>
            <Link to="/auth">Login</Link>
        </li>
            
            
            </>
          
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