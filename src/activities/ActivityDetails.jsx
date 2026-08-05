import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";

import { deleteActivity, getActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadActivity() {
      try {
        const data = await getActivity(id);

        setActivity(data);
      } catch (error) {
        setError(error.message);
      }
    }

    loadActivity();
  }, [id]);

  async function handleDelete() {
    try {
      setError(null);

      await deleteActivity(token, id);

      navigate("/activities");
    } catch (error) {
      setError(error.message);
    }
  }

  if (error && !activity) {
    return <p role="alert">{error}</p>;
  }

  if (!activity) {
    return <p>Loading activity...</p>;
  }

  return (
    <>
      <h1>{activity.name}</h1>

      <p>{activity.description}</p>

      <p>Created by: {activity.creatorName}</p>

      {error && <p role="alert">{error}</p>}

      {token && <button onClick={handleDelete}>Delete</button>}

      <NavLink to="/activities">Back to activities</NavLink>
    </>
  );
}
