import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jwt-decode";

export default function Body() {
  const [list, setList] = useState([]);
  
  const token = localStorage.getItem('token');
  const decodedtoken = jwt(token);
  const email = decodedtoken.email;
  //display the list when page loads and list gets updated
  useEffect(() => {
    axios.get("/getlist/" + email).then((res) => {
      setList(res.data.list);
    });
    return;
  }, [list]);

  const [data, setData] = useState({
    email: email,
    title: "",
    description: "",
    id: ""
  });

  //handle the change in input fields (title and description)
  function handleChange(event) {
    const { name, value } = event.target;
    setData((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  //add button function
  function addItem(event) {
    event.preventDefault();
    axios.post("/addItem", data);
  }

  //delete button function
  function deleteItem(item) {
    axios.post("/deleteItem", {
      email: email,
      id: item.id,
      title: item.title,
      description: item.description,
    });
  }

  return (
    <div className="home_box">
      <div className="home_form">
        <input
          className="home_input"
          name="title"
          onChange={handleChange}
          type="text"
          placeholder="Topic"
        ></input>
        <input
          className="home_input"
          name="description"
          onChange={handleChange}
          type="text"
          placeholder="Description"
        ></input>
        <button className="addbtn" onClick={addItem}>
          ADD
        </button>
      </div>
      <div className="home_table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th style={{ width: "10px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button className="dltbtn" onClick={() => deleteItem(item)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="black"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                      style={{marginLeft: '-5px'}}
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
