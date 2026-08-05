import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  async function tryRegister(formData) {
    setError(null);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      await register({ username, password });

      navigate("/activities");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h1>Register for an account</h1>

      <form action={tryRegister}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>

        <label>
          Password
          <input type="password" name="password" required />
        </label>

        <button>Register</button>

        {error && <p role="alert">{error}</p>}
      </form>

      <NavLink to="/login">Already have an account? Log in here.</NavLink>
    </>
  );
}
