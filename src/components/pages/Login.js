import { Spin } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Amwell from "../../assets/amwell.jpeg";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login, resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { email, password } = e.target;
      await login(email.value.trim(), password.value.trim());
      setLoading(false);
      navigate("/");
    } catch (error) {
      setAlert("email or password is incorrect");
      setLoading(false);
    }
  };

  const onForgotPassword = async () => {
    let email = prompt("Please enter your email", "");
    if (email.trim() != null) {
      try {
        await resetPassword(email.trim());
        window.alert("Password reset email sent");
      } catch (error) {
        setAlert(error.message);
      }
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
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

          <div class="form-floating">
            <input
              type="email"
              name="email"
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

          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button
            disabled={loading}
            class="w-100 btn btn-lg btn-primary"
            type="submit"
          >
            Sign in
          </button>
          <p
            onClick={onForgotPassword}
            className="text-center mt-3 cursor-pointer"
          >
            Forgot Password?
          </p>
        </form>
      </main>
    </Spin>
  );
}

export default Login;
