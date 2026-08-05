import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";

export default function ActivityList({ activities, syncActivities }) {
  const { token } = useAuth();

  const [deleteError, setDeleteError] = useState(null);

  async function handleDelete(activityId) {
    try {
      setDeleteError(null);

      await deleteActivity(token, activityId);

      await syncActivities();
    } catch (error) {
      setDeleteError(error.message);
    }
  }

  return (
    <>
      {deleteError && <p role="alert">{deleteError}</p>}

      <ul>
        {activities.map((activity) => {
          const activityId = activity.id;

          return (
            <li key={activityId}>
              {activity.name}

              {token && (
                <button onClick={() => handleDelete(activityId)}>Delete</button>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
