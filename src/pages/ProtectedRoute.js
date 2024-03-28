import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  const { hasPaid } = useSelector((store) => store.payment);

  if (!user) {
    return <Navigate to="/register" />;
  } else if (!hasPaid) {
    toast.warn("You need to pay to access this feature.");
    return <Navigate to="/pay" />;
  }

  return children;
};

export default ProtectedRoute;
