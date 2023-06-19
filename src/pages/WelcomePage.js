import { Link } from "react-router-dom/cjs/react-router-dom.min";
const WelcomePage = () => {
    return<>

    <h2>Welcome To Expense Tracker!!!</h2>

    <p> Your Profile is incomplete.<Link to='/completeprofile'>Complete Now</Link> </p>
    <hr />
    </>
}

export default WelcomePage;