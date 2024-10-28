import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../Variable.js';
import './signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
    const api_url = baseUrl;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(`${api_url}/signup/`, {
                email,
                password,
            });
            
            if (response.status === 201) {
                setSuccess('Account created successfully. You can now log in.');
                setEmail('');
                setPassword('');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred during signup');
        }
    };

    return (
        <div className="signup-form">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="password-field">
                    <label>Password:</label>
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input
                        type={showPassword ? 'text' : 'password'} // Toggle password visibility
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye} // Show different icon based on visibility
                        className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                    />
                </div>
                <button type="submit">Signup</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default Signup;
