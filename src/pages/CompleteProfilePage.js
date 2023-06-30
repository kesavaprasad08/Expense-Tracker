import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const CompleteProfilePage = () => {
  const fullNameInputRef = useRef();
  const profilePhotoUrlRef = useRef();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCBIutYQxemEvfAy3NV3Cxty0b_12wNrU0";
    const requestBody = {
      idToken: token,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        fullNameInputRef.current.value = data.users[0].displayName;
        profilePhotoUrlRef.current.value = data.users[0].photoUrl;
      });
  }, [token]);
  const submitHandler = (e) => {
    e.preventDefault();
    const name = fullNameInputRef.current.value;
    const imgUrl = profilePhotoUrlRef.current.value;
    const idToken = token; // get the Firebase Auth ID token for the user
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCBIutYQxemEvfAy3NV3Cxty0b_12wNrU0";
    const requestBody = {
      idToken: idToken,
      displayName: name,
      photoUrl: imgUrl,
      deleteAttribute: [], // list of attributes to delete, can be empty
      returnSecureToken: true, // whether or not to return an ID and refresh token
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
          console.log("Profile Updated Successfully");
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <h1>Contact Details</h1>

      <form onSubmit={submitHandler}>
        <label htmlFor="fullName">Full Name:</label>
        <input ref={fullNameInputRef}></input>
        <label htmlFor="profilePhotoUrl">Profile Photo Url:</label>
        <input ref={profilePhotoUrlRef}></input>
        <button>Update</button>
      </form>

      <hr />
    </>
  );
};

export default CompleteProfilePage;
