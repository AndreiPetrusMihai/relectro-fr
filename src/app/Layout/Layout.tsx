import { AppShell, Center } from "@mantine/core";
import { FCWC } from "react";
import { useAuthContext } from "../../features/authentication/hooks/useAuthContext";
import AppNavbar from "./components/AppNavbar/AppNavbar";

export const appShellPadding = 16;

const Layout: FCWC = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated)
    return <Center sx={{ height: "100vh" }}>{children}</Center>;

  return (
    <AppShell padding={appShellPadding} navbar={<AppNavbar />}>
      {children}
    </AppShell>
  );
};

export default Layout;
