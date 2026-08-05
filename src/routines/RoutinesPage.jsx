import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import { createRoutine, getRoutines } from "../api/routines";
import { useAuth } from "../auth/AuthContext";

export default function RoutinesPage() {
  const { token } = useAuth();

  const [routines, setRoutines] = useState([]);
  const [error, setError] = useState(null);

  async function syncRoutines() {
    const data = await getRoutines();

    setRoutines(data);
  }

  useEffect(() => {
    syncRoutines();
  }, []);

  async function handleSubmit(formData) {
    setError(null);

    const name = formData.get("name");
    const goal = formData.get("goal");

    const newRoutine = {
      name: name,
      goal: goal,
    };

    try {
      await createRoutine(token, newRoutine);
      await syncRoutines();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h1>Routines</h1>

      <ul>
        {routines.map((routine) => (
          <li key={routine.id}>
            <NavLink to={"/routines/" + routine.id}>{routine.name}</NavLink>
          </li>
        ))}
      </ul>

      {token && (
        <>
          <h2>Add a new routine</h2>

          <form action={handleSubmit}>
            <label>
              Name
              <input type="text" name="name" required />
            </label>

            <label>
              Goal
              <input type="text" name="goal" required />
            </label>

            <button>Add routine</button>
          </form>

          {error && <p role="alert">{error}</p>}
        </>
      )}
    </>
  );
}
