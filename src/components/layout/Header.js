import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./index.css";
function Header({ setModalVisible }) {
  const login_by = localStorage.getItem("login_by");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      alert("failed to logout");
    }
  };

  return (
    <div className="container-fluid amwell-header">
      <div className="row">
        <div className="col-lg-11 mx-auto">
          <nav className="navbar navbar-expand-lg navbar-light">
            <NavLink
              to="/"
              className="navbar-brand font-weight-bold text-gray-b"
            >
              AMWELL
            </NavLink>
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

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <NavLink to="/" className="nav-link text-gray-b">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link text-gray-b">
                    About
                  </NavLink>
                </li>
                {currentUser ? (
                  <li className="nav-item">
                    <span
                      onClick={handleLogout}
                      className="nav-link text-gray-b"
                    >
                      Logout
                    </span>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link text-gray-b">
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link text-gray-b">
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
                {login_by === "doctor" && currentUser && (
                  <li className="nav-item m-auto">
                    <button onClick={setModalVisible} className="btn btn-light">
                      Update Profile
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
