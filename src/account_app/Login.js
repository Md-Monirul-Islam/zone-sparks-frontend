import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from "../Variable.js";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth  } from "../authentication/AuthContext.js";

const Login = () => {
  const api_url = baseUrl;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
            const { user_id, email, token, is_superuser } = response.data; // Ensure is_superuser is included
            // Save user data in local storage
            localStorage.setItem('user_id', user_id);
            localStorage.setItem('token', token);
            localStorage.setItem('is_superuser', is_superuser); // Save the superuser status

            // Redirect based on superuser status
            navigate(is_superuser ? '/dashboard/' : '/'); // Redirect based on the superuser status
            setSuccess("Login successful!");
            setEmail("");
            setPassword("");
        }
    } catch (err) {
        setError(err.response?.data?.error || "An error occurred during login");
    }
};



return (
  <div className="login-container">
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
  </div>
);
}
export default Login;