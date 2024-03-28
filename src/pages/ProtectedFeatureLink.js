import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash"; // Assuming lodash is installed

const RequirePayment = ({ children }) => {
  const navigate = useNavigate();
  const { hasPaid } = useSelector((store) => store.payment);

  const debouncedWarning = useCallback(
    _.debounce(() => {
      toast.warning(
        "Access to this feature is limited to paid users. Please proceed to payment."
      );
      navigate("/pay");
    }, 500),
    []
  ); // 500ms debounce time

  useEffect(() => {
    if (!hasPaid) {
      debouncedWarning();
    }
    // Cancel the debounce on cleanup to prevent memory leaks
    return () => debouncedWarning.cancel();
  }, [hasPaid, debouncedWarning]);

  return hasPaid ? children : null;
};

export default RequirePayment;
