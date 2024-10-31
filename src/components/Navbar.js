import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth  } from '../authentication/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              {isLoggedIn ? (
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup/">Signup</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login/">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav><br></br><br></br><br></br><br></br>
    </div>
  );
}
