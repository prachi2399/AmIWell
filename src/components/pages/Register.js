import { Spin } from "antd";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Amwell from "../../assets/amwell.jpeg";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { email, password, confirmPassword, login_by } = e.target;
      if (password.value === confirmPassword.value) {
        localStorage.setItem("login_by", login_by.value);
        await signup(email.value, password.value);
        setLoading(false);
        navigate("/");
      } else {
        setAlert("Passwords do not match");
        setLoading(false);
        return;
      }
    } catch (error) {
      setAlert(error.message);
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <main
        class="form-signin row"
        style={{
          justifyContent: "center",
          minHeight: "100vh",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={onSubmit}
          className="col-md-4 col-12"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          <img class="mb-4" src={Amwell} alt="" width="100" />
          {alert && <div class="alert alert-danger">{alert}</div>}
          <h1 class="h3 mb-3 fw-normal">Please sign up</h1>

          <div class="form-floating">
            <input
              name="email"
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input
              name="password"
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>
          <div class="form-floating">
            <input
              name="confirmPassword"
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Confirm Password"
            />
            <label for="floatingPassword">Confirm Password</label>
          </div>
          <div className="d-flex">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="login_by"
                id="inlineRadio1"
                value="patient"
              />
              <label class="form-check-label" for="inlineRadio1">
                Patient
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="login_by"
                id="inlineRadio2"
                value="doctor"
              />
              <label class="form-check-label" for="inlineRadio2">
                Doctor
              </label>
            </div>
          </div>
          <button
            disabled={loading}
            class="w-100 btn btn-lg btn-primary"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </main>
    </Spin>
  );
}

export default Register;
