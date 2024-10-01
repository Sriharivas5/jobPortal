import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.scss";
import loginShield from "../../../assets/shield.png";
function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (name == "" || password == "") {
      alert("please neter all the fields");
    } else {
      try {
        console.log(name, password);
        const response = await axios.post("http://localhost:3000/api/login", {
          fullname: name,
          password: password,
        });
        console.log("Login successful:", response);
        sessionStorage.setItem("Id", response.data.user._id);
        sessionStorage.setItem("token", response.data.token);

        if (response.data.user.empType == "employer") {
          navigate("/viewpostedjobs");
        } else {
          navigate("/alljobs");
        }
      } catch (err) {
        console.log(err);
        alert(err.response);
      }
    }
  };
  return (
    <div className="login">
      <div className="container">
        <img src={loginShield} />

        <label>
          UserName
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </label>

        <button onClick={handleLogin}>Submit</button>

        <div id="formBase">
          <p> I have already registered </p> <Link to="/">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
