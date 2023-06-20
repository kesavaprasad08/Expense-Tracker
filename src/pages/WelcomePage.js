import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../store/auth-context";
import { useContext } from "react";
const WelcomePage = () => {
    const authCtx = useContext(AuthContext);
const verifyEmailHandler = async(e)=> {
    e.preventDefault();
    try{
    const requestBody = {
        requestType:"VERIFY_EMAIL",
        idToken: authCtx.token,
      };
    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCBIutYQxemEvfAy3NV3Cxty0b_12wNrU0',
    {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log(res);
    }
    catch (e) {
        console.log(e);
    }
}

    return<>

    <h2>Welcome To Expense Tracker!!!</h2>

    <p> Your Profile is incomplete.<Link to='/completeprofile'>Complete Now</Link> </p>
    <hr />
    <button onClick={verifyEmailHandler}>Verify Email</button>
    </>
}

export default WelcomePage;