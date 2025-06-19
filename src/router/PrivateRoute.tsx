import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem("user");

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
