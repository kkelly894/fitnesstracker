import { Route, Routes } from "react-router";

import Layout from "./layout/Layout";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityDetails from "./activities/ActivityDetails";
import Error404 from "./Error404";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ActivitiesPage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="activities/:id" element={<ActivityDetails />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
