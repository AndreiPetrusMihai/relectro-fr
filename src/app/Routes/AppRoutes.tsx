import { Routes, Route, Navigate } from "react-router-dom";
import { Roles } from "../../common/model/Roles";
import { useAuthContext } from "../../features/authentication/hooks/useAuthContext";
import LoginPage from "../../features/authentication/pages/LoginPage/LoginPage";
import DeviceHistoryPage from "../../features/deviceHistory/pages/DeviceHistoryPage/DeviceHistoryPage";
import DevicesPage from "../../features/devices/pages/DevicesPage/DevicesPage";
import UsersPage from "../../features/users/pages/UsersPage/UsersPage";
import { Routes as RoutesEnum } from "../Routes/routes";

const AppRoutes = () => {
  const { isAuthenticated, role } = useAuthContext();

  const roleDefaultRedirectRoute = role === Roles.Admin ? "/users" : "/devices";

  const roleIsUser = role === Roles.User;
  return (
    <Routes>
      {!isAuthenticated && (
        <Route path={RoutesEnum.Login} element={<LoginPage />} />
      )}
      {isAuthenticated && (
        <Route path={RoutesEnum.Users} element={<UsersPage />} />
      )}
      {isAuthenticated && (
        <Route path={RoutesEnum.Devices} element={<DevicesPage />} />
      )}
      {isAuthenticated && roleIsUser && (
        <Route
          path={RoutesEnum.DeviceHistory}
          element={<DeviceHistoryPage />}
        />
      )}
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? roleDefaultRedirectRoute : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
