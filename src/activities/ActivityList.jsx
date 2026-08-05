import { NavLink } from "react-router";

export default function ActivityList({ activities }) {
  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.id}>
          <NavLink to={"/activities/" + activity.id}>{activity.name}</NavLink>
        </li>
      ))}
    </ul>
  );
}
