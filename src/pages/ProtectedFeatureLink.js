import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

const RequirePayment = ({ children }) => {
  const navigate = useNavigate();
  const { hasPaid } = useSelector((store) => store.payment);

  // Create the debounced function outside of useEffect or useCallback
  const debouncedWarning = _.debounce(() => {
    toast.warning(
      "Access to this feature is limited to paid users. Please proceed to payment."
    );
    navigate("/pay");
  }, 500);

  useEffect(() => {
    if (!hasPaid) {
      debouncedWarning();
    }
    // Cancel the debounce on cleanup to prevent memory leaks
    return () => debouncedWarning.cancel();
  }, [hasPaid, debouncedWarning]); // debouncedWarning is stable, does not need to be in the deps array

  return hasPaid ? children : null;
};

export default RequirePayment;
