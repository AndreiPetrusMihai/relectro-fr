import React, { ComponentProps, FCWC, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../features/authentication/hooks/useAuthContext";

type Props = ComponentProps<typeof Route>;

const GuardedRoute: FCWC<Props> = (props: Props) => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return <Route {...props} />;
};

export default GuardedRoute;
