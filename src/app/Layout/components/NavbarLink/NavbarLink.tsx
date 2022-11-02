import { Tooltip, UnstyledButton } from "@mantine/core";
import { TablerIcon } from "@tabler/icons";
import { FCWC } from "react";
import { useStyles } from "../AppNavbar/styles";

type NavbarLinkProps = {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
};

const NavbarLink: FCWC<NavbarLinkProps> = ({
  icon: Icon,
  label,
  active,
  onClick,
}) => {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        mt={10}
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
};

export default NavbarLink;
