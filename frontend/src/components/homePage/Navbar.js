import React from "react";
import "./navbar.css";
import {Link} from 'react-router-dom';

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div className="navbar">
      <div className="navheading" style={{ marginLeft: "10vw" }}>
        TO-DO List
      </div>
      <div className="control-panel" style={{ marginRight: "10vw" }}>
        
        <button className="logout-btn" onClick={logout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="black"
            class="bi bi-power"
            viewBox="0 0 16 16"
            style={{ marginLeft: "-10px" }}
          >
            <path d="M7.5 1v7h1V1h-1z" />
            <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
          </svg>
        </button>
      </div>
    </div>
  );
}


/*
<button className="profile-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="37"
            fill="black"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
            style={{ marginLeft: "-10px",marginTop: '-2px',backgroundColor: 'aqua',borderRadius:'50%' }}
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </button>
        */