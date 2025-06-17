import { Route, Routes } from "react-router-dom";
import Auth from "../features/auth/pages/Auth";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Events from "../features/eventSection/pages/Events";
import EventDetails from "../features/eventDetails/pages/EventDetails";
import Challenge from "../features/challenge/pages/Challenge";
import Leaderboard from "../features/leaderboard/pages/Leaderboard";
import Social from "../features/social/pages/Social";
import HelpMe from "../pages/HelpMe";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/events" element={<Events />} />
      <Route path="/event/:eventName" element={<EventDetails />} />
      <Route path="/challenge/:id" element={<Challenge />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/social" element={<Social />} />
      <Route path="/how-it-works" element={<HelpMe />} />
    </Routes>
  );
};

export default AppRouter;
