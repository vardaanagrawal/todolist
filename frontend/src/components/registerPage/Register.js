import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState([]);
  const [messageActive, setMessageActive] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function addUser(event) {
    event.preventDefault();
    if (!user.email || !user.password || !user.confirmpassword) {
      setStatus(400);
      setMessageActive(true);
      setTimeout(() => {
        setMessageActive(false);
      }, 2500);
      setMessage("please enter details");
    } 
    else {
      const newUser = {
        email: user.email,
        password: user.password,
        confirmpassword: user.confirmpassword,
      };
      if (user.password === user.confirmpassword) {
        axios
          .post("http://localhost:7000/registeruser", newUser)
          .then((res) => {
            setStatus(res.data.status);
            setMessage(res.data.message);
            setMessageActive(true);
            setTimeout(() => {
              setMessageActive(false);
            }, 2500);
          });
      } else {
        setStatus(400);
        setMessageActive(true);
        setTimeout(() => {
          setMessageActive(false);
        }, 2500);
        setMessage("passwords do not match");
      }
    }
  }

  return (
    <div className="Page">
      <div className="box">
        <div className="header">REGISTER</div>
        <div className="body">
          <div
            className={messageActive ? "showMessage" : "hidemessage"}
            style={{ backgroundColor: status === 200 ? "green" : "red" }}
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            onChange={handleChange}
          ></input>
          <button onClick={addUser}>Register</button>
        </div>
        <div className="footer">
          Already a user? Login <Link to="/login">here</Link>
        </div>
      </div>
    </div>
  );
}
