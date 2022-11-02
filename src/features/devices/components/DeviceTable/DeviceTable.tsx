import { showNotification } from "@mantine/notifications";
import { IconTrash, IconUserPlus } from "@tabler/icons";
import CustomTable, {
  ContextMenuOption,
} from "../../../../common/components/Table/CustomTable/CustomTable";
import { ColumnConfig } from "../../../../common/components/Table/types";
import { Roles } from "../../../../common/model/Roles";
import { useAuthContext } from "../../../authentication/hooks/useAuthContext";
import { Device } from "../../model/Device";
import { useDeleteDeviceMutation } from "../../slice";

type Props = {
  devices: Device[];
  onDeviceClick: (device: Device) => void;
  onAssignToUser: (device: Device) => void;
};

const DeviceTable = ({ devices, onDeviceClick, onAssignToUser }: Props) => {
  const { role } = useAuthContext();

  const [deleteDevice] = useDeleteDeviceMutation();

  const onDelete = ({ id }: Device) => {
    deleteDevice(id)
      .unwrap()
      .catch(() => {
        showNotification({
          title: "User deletion failed",
          message: "",
          color: "red",
        });
      });
  };

  const deviceTableContextMenuOptions: ContextMenuOption<Device>[] = [
    { text: "Delete", IconComponent: IconTrash, action: onDelete },
    {
      text: "Assign to User",
      IconComponent: IconUserPlus,
      action: onAssignToUser,
    },
  ];

  const deviceTableColumns: ColumnConfig<Device>[] = [
    { headerName: "Name", itemKey: "name" },
    { headerName: "Description", itemKey: "description" },
    {
      headerName: "Max Hourly Energy Consuption",
      itemKey: "maxHourlyEnergyConsuption",
    },
  ];

  if (role === Roles.Admin)
    deviceTableColumns.push({
      headerName: "Assigned User",
      mappingFunction: (device) => device.owner?.name || "-",
    });

  return (
    <CustomTable
      items={devices}
      onRowClick={onDeviceClick}
      columnsConfig={deviceTableColumns}
      contextMenuOptions={
        role === Roles.Admin ? deviceTableContextMenuOptions : undefined
      }
    />
  );
};

export default DeviceTable;
