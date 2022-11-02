import { useContext } from "react";
import { Roles } from "../../../common/model/Roles";
import { AuthContext } from "../contexts/AuthContext";

export const useAuthContext = () => {
  const values = useContext(AuthContext);

  return {
    ...values,
    isAuthenticated: !!values.userData.authToken,
    role: values.userData.role,
  };
};
