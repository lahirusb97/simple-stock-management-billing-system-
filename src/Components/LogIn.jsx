import React from "react";
import { useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import "../FirebaseConfig";
export default function LogIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const submiteLogin = async () => {
    const dbRef = ref(getDatabase());

    await get(child(dbRef, `/Hi_Mobile/User`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data["Email"] === email) {
            if (data["Password"] === password) {
              navigate("/home");
            } else {
              console.log("passwrong");
            }
          } else {
            console.log("Email Wrong");
          }
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className=" w-full h-screen flex flex-col md:flex-row">
      <div className=" md:w-1/2  flex justify-center items-center">
        <img src="./Images/shop.jpg" />
      </div>
      <div className=" md:w-1/2 flex justify-center items-center">
        <div className=" md:w-1/2 md:p-4">
          <h1 className=" text-5xl font-bold">Your Shop</h1>
          <p>Your Shop Stock System</p>

          <TextField
            className=" w-full"
            sx={{ marginTop: "1rem" }}
            label="Email"
            type={"text"}
            variant="outlined"
            onChange={handleChangeEmail}
          />
          <TextField
            className=" w-full"
            sx={{ marginTop: "1rem" }}
            label="Password"
            type="password"
            variant="outlined"
            onChange={handleChangePassword}
          />

          <button
            onClick={submiteLogin}
            className="  w-full bg-blue-500 p-3 mt-4 font-bold text-white"
          >
            LogIn
          </button>
        </div>
      </div>
    </div>
  );
}
