import { Navigate } from "react-router-dom";
import { ROUTES } from "../lib/consts";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const accessDetails = useSelector((state: any) => state.authReducer);

  return !!accessDetails.accessToken ? (
    children
  ) : (
    <Navigate to={ROUTES.LOGIN} />
  );
};

export default PrivateRoute;
