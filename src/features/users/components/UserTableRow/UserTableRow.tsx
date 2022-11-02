import { User } from "../../model/User";
import { useStyles } from "./styles";
import { IconDots, IconTrash } from "@tabler/icons";
import { ActionIcon, Menu } from "@mantine/core";
import { SyntheticEvent, useState } from "react";

type Props = {
  user: User;
  onClick: (user: User) => void;
  onDelete: (userId: number) => void;
};

const UserTableRow = ({ user, onClick, onDelete }: Props) => {
  const { classes } = useStyles();

  const [menuOpen, setMenuOpen] = useState(false);

  const onRowClick = () => {
    onClick(user);
  };

  const onContextClick = (
    event: SyntheticEvent<HTMLButtonElement> | undefined
  ) => {
    event?.stopPropagation();
    setMenuOpen(true);
  };

  const onDeleteClick = (event: any) => {
    event?.stopPropagation();
    onDelete(user.id);
  };

  return (
    <tr className={classes.onHover} onClick={onRowClick}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>
        <Menu opened={menuOpen} onChange={setMenuOpen}>
          <Menu.Target>
            <ActionIcon variant="default" ml="70%" onClick={onContextClick}>
              <IconDots />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconTrash size={14} />} onClick={onDeleteClick}>
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  );
};

export default UserTableRow;
