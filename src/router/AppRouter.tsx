import { Route, Routes } from "react-router-dom";
import Auth from "../features/auth/pages/Auth";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Events from "../features/eventSection/pages/Events";
import EventDetails from "../features/eventDetails/pages/EventDetails";
import Challenge from "../features/challenge/pages/Challenge";
import Leaderboard from "../features/leaderboard/pages/Leaderboard";
import Social from "../features/social/pages/Social";
import HelpMe from "../pages/HelpMe";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/auth" element={<Auth />} />

      {/* Protected Routes */}
      <Route
        path="/events"
        element={
          <PrivateRoute>
            <Events />
          </PrivateRoute>
        }
      />
      <Route
        path="/event/:eventName"
        element={
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/challenge/:id"
        element={
          <PrivateRoute>
            <Challenge />
          </PrivateRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <PrivateRoute>
            <Leaderboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/social"
        element={
          <PrivateRoute>
            <Social />
          </PrivateRoute>
        }
      />
      <Route
        path="/how-it-works"
        element={
          <PrivateRoute>
            <HelpMe />
          </PrivateRoute>
        }
      />

      {/* wrong route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
