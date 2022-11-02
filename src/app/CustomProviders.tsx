import { FCWC } from "react";
import { AuthContextProvider } from "../features/authentication/contexts/AuthContext";

const CustomProviders: FCWC = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default CustomProviders;
