import jwtDecode from "jwt-decode";
import { createContext, FCWC, useState } from "react";
import { useDispatch } from "react-redux";
import { Roles } from "../../../common/model/Roles";
import { Token } from "../model/Token";
import { loginUser } from "../slice";

export type AuthUserData = {
  authToken?: string;
  email?: string;
  name?: string;
  role?: Roles;
  id?: number;
};

type AuthContextValue = {
  userData: AuthUserData;
  login: (token: string) => void;
  logout: () => void;
};

const defaultUserDataValue = {
  authToken: undefined,
  email: undefined,
  name: undefined,
  role: undefined,
  id: undefined,
};

const defaultContextValue: AuthContextValue = {
  userData: defaultUserDataValue,
  login: (_: string) => {},
  logout: () => {},
};

export const AuthContext = createContext(defaultContextValue);

export const AuthContextProvider: FCWC = ({ children }) => {
  const [userData, setUserData] = useState<AuthUserData>(defaultUserDataValue);
  const dispatch = useDispatch();

  const logout = () => {
    setUserData(defaultUserDataValue);
  };

  const login = (token: string) => {
    const tokenData = jwtDecode(token) as Token;

    const userData: AuthUserData = {
      authToken: token,
      email:
        tokenData[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ],
      name: tokenData[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ],
      role:
        tokenData[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] === "Admin"
          ? Roles.Admin
          : Roles.User,
      id: parseInt(tokenData["jti"]),
    };

    if (!userData) throw Error("Invalid token jti");
    dispatch(loginUser(userData));
    setUserData(userData);
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
