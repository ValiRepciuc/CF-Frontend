import { Route, Routes } from "react-router-dom";
import Auth from "../features/auth/pages/Auth";
import Dashboard from "../features/dashboard/pages/Dashboard";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/auth" element={<Auth />} />
      {/* Add more routes here as needed */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* <Route path="/profile" element={<Profile />} /> */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRouter;
