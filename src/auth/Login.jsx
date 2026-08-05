import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  async function tryLogin(formData) {
    setError(null);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      await login({ username, password });

      navigate("/activities");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h1>Log in to your account</h1>

      <form action={tryLogin}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>

        <label>
          Password
          <input type="password" name="password" required />
        </label>

        <button>Login</button>

        {error && <p role="alert">{error}</p>}
      </form>

      <NavLink to="/register">Need an account? Register here.</NavLink>
    </>
  );
}
