import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";

import { getActivities } from "../api/activities";
import { addSet, deleteRoutine, deleteSet, getRoutines } from "../api/routines";
import { useAuth } from "../auth/AuthContext";

export default function RoutineDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [routine, setRoutine] = useState(null);
  const [activities, setActivities] = useState([]);
  const [deleteError, setDeleteError] = useState(null);
  const [setError, setSetError] = useState(null);

  async function loadRoutine() {
    const routines = await getRoutines();

    const selectedRoutine = routines.find(function (routine) {
      return routine.id === Number(id);
    });

    setRoutine(selectedRoutine);
  }

  async function loadActivities() {
    const data = await getActivities();

    setActivities(data);
  }

  useEffect(() => {
    loadRoutine();
    loadActivities();
  }, [id]);

  async function handleDeleteRoutine() {
    try {
      setDeleteError(null);

      await deleteRoutine(token, id);

      navigate("/routines");
    } catch (error) {
      setDeleteError(error.message);
    }
  }

  async function handleAddSet(formData) {
    setSetError(null);

    const activityId = formData.get("activityId");
    const count = formData.get("count");

    const newSet = {
      activityId: Number(activityId),
      routineId: Number(id),
      count: Number(count),
    };

    try {
      await addSet(token, newSet);
      await loadRoutine();
    } catch (error) {
      setSetError(error.message);
    }
  }

  async function handleDeleteSet(setId) {
    try {
      setSetError(null);

      await deleteSet(token, setId);
      await loadRoutine();
    } catch (error) {
      setSetError(error.message);
    }
  }

  if (!routine) {
    return <p>Loading routine...</p>;
  }

  return (
    <>
      <h1>{routine.name}</h1>

      <p>Goal: {routine.goal}</p>
      <p>Created by: {routine.creatorName}</p>

      {token && <button onClick={handleDeleteRoutine}>Delete routine</button>}

      {deleteError && <p role="alert">{deleteError}</p>}

      <h2>Sets</h2>

      {routine.sets.length === 0 ? (
        <p>Add a set to this routine.</p>
      ) : (
        <ul>
          {routine.sets.map((set) => (
            <li key={set.id}>
              {set.name}: {set.count} reps
              {token && (
                <button onClick={() => handleDeleteSet(set.id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      )}

      {token && (
        <>
          <h2>Add a set</h2>

          <form action={handleAddSet}>
            <label>
              Activity
              <select name="activityId" required>
                <option value="">Select an activity</option>

                {activities.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Reps
              <input type="number" name="count" min="1" required />
            </label>

            <button>Add set</button>
          </form>

          {setError && <p role="alert">{setError}</p>}
        </>
      )}

      <NavLink to="/routines">Back to routines</NavLink>
    </>
  );
}
