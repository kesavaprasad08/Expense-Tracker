import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useRef } from "react";

const ForgotPasswordPage = () => {
const emailRef = useRef();
const submitHandler = async(e) => {
    const email = emailRef.current.value;
    e.preventDefault();
    
    const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCBIutYQxemEvfAy3NV3Cxty0b_12wNrU0";
  const requestBody = {
    requestType: "PASSWORD_RESET",
    email:email
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
      }

      return response.json();
    })
    .then((data) => {
     alert('Password reset link sent to email successfully');
     
    })
    .catch((error) => {
      console.log(error);
    });

}


return<>
    <form onSubmit={submitHandler}>
        <label htmlFor="email">Enter the Email with which you have registered</label>
        <input type="text" ref={emailRef} />
        <button>Send Link</button>
        <p>Already a user ?<Link to='/auth'>Sign in</Link></p>
    </form>
    </>
}

export default ForgotPasswordPage;