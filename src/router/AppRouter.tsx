import { Route, Routes } from "react-router-dom";
import Auth from "../features/auth/pages/Auth";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Events from "../features/eventSection/pages/Events";
import EventDetails from "../features/eventDetails/pages/eventDetails";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/events" element={<Events />} />
      <Route path="/event/:eventName" element={<EventDetails />} />

    </Routes>
  );
};

export default AppRouter;
