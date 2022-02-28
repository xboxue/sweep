import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectUser } from "../../features/auth/authSlice";

interface Props {
  children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = useSelector(selectUser);

  if (!user && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
