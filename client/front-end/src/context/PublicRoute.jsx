import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext"; 

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/listings" replace /> : <Outlet />;
};

export default PrivateRoute;
