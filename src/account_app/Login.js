import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../Variable.js";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth  } from "../authentication/AuthContext.js";

const Login = () => {
  const api_url = baseUrl;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth(); // Access login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${api_url}/login/`, {
        email,
        password,
      });
      
      if (response.status === 200) {
        login({
          user_id: response.data.user_id,
          email: response.data.email,
        });
        
        setSuccess("Login successful!");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during login");
    }
  };

  return (
    <div className="login-form">
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email:</label>
          <div className="input-wrapper">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div className="input-container">
          <label>Password:</label>
          <div className="input-wrapper">
            <FontAwesomeIcon icon={faLock} className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;