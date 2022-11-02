import { showNotification } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons";
import CustomTable, {
  ColumnConfig,
  ContextMenuOption,
} from "../../../../common/components/Table/CustomTable/CustomTable";
import { User } from "../../model/User";
import { useDeleteUserMutation } from "../../slice";

type Props = {
  users: User[];
  onUserClick: (user: User) => void;
};

const userTableColumns: ColumnConfig<User>[] = [
  { headerName: "Name", itemKey: "name" },
  { headerName: "Email", itemKey: "email" },
  { headerName: "Password", itemKey: "password" },
];

const UserTable = ({ users, onUserClick }: Props) => {
  const [deleteUser] = useDeleteUserMutation();

  const onDelete = ({ id }: User) => {
    deleteUser(id)
      .unwrap()
      .catch(() => {
        showNotification({
          title: "User deletion failed",
          message: "",
          color: "red",
        });
      });
  };

  const userTableContextMenuOptions: ContextMenuOption<User>[] = [
    { text: "Delete", IconComponent: IconTrash, action: onDelete },
  ];

  return (
    <CustomTable
      items={users}
      onRowClick={onUserClick}
      columnsConfig={userTableColumns}
      contextMenuOptions={userTableContextMenuOptions}
    />
  );
};

export default UserTable;
