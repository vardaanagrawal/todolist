import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";

export default function Login() {
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(400);
  const [messageActive, setMessageActive] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function loginUser(event) {
    event.preventDefault();
    if (!user.email || !user.password) {
      setStatus(400);
      setMessage("Please Enter Details");
      setMessageActive(true);
      setTimeout(() => {
        setMessageActive(false);
      }, 2500);
    } else {
      axios
      .post("/loginuser", {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        setStatus(res.data.status);
        setMessage(res.data.message);
        setMessageActive(true);
        setTimeout(() => {
          setMessageActive(false);
        }, 2500);

        const decodedtoken = jwt(res.data.token);
        console.log(decodedtoken);
        if(decodedtoken.email === user.email){
          localStorage.setItem('token',res.data.token)
          window.location.href = `/:${user.email}`
        }

      });
    }
  }

  return (
    <div className="Page">
      <div className="box">
        <div className="header">LOG IN</div>
        <div className="body">
          <div
            className={messageActive ? "showMessage" : "hidemessage"}
            style={{ backgroundColor: status == 200 ? "green" : "red" }}
          >
            {message}
          </div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          ></input>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          ></input>
          <button onClick={loginUser}>LOG IN</button>
        </div>
        <div className="footer">
          dont have an account? Register <Link to="/register">here</Link>
        </div>
      </div>
    </div>
  );
}

/*
axios.get("http://localhost:7000/loginuser/" +newUser.email +"/" +newUser.password)
      .then((res)=>{
        console.log(res.data.token);
        const decodedtoken = jwt(res.data.token);
        console.log(decodedtoken);
        if(decodedtoken.user === user.email){
          localStorage.setItem('token',res.data.token);
          window.location.href = `/:${user.email}`
        }
      })
      */
