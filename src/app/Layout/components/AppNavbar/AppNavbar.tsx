import { Center, Navbar, Stack } from "@mantine/core";
import { IconDevices2, IconLogout, IconUsers, TablerIcon } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Roles } from "../../../../common/model/Roles";
import { useAuthContext } from "../../../../features/authentication/hooks/useAuthContext";
import { Routes } from "../../../Routes/routes";
import NavbarLink from "../NavbarLink/NavbarLink";

type PageInfo = {
  icon: TablerIcon;
  label: string;
  route: Routes;
};

const pages = [
  {
    icon: IconUsers,
    label: "Users",
    route: Routes.Users,
    roles: [Roles.Admin],
  },
  {
    icon: IconDevices2,
    label: "Devices",
    route: Routes.Devices,
    roles: [Roles.User, Roles.Admin],
  },
];

const AppNavbar = () => {
  const { logout, role } = useAuthContext();
  const location = useLocation();

  const [activeRoute, setActiveRoute] = useState(
    pages.find((page) => location.pathname.includes(page.route))?.route
  );

  useEffect(() => {
    const matchedRoute = pages.find((page) =>
      location.pathname.includes(page.route)
    )?.route;
    if (matchedRoute !== activeRoute) setActiveRoute(matchedRoute);
  }, [location]);

  const navigate = useNavigate();

  const onLinkClick = (page: PageInfo) => {
    navigate(page.route);
    setActiveRoute(page.route);
  };

  const links = pages.map(
    (page) =>
      page.roles.includes(role) && (
        <NavbarLink
          {...page}
          key={page.route}
          active={page.route === activeRoute}
          onClick={() => onLinkClick(page)}
        />
      )
  );

  return (
    <Navbar width={{ base: 80 }} p="md">
      <Center>ELI</Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconLogout} label="Logout" onClick={logout} />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default AppNavbar;
