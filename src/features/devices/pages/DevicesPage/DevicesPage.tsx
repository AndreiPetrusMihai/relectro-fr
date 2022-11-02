import { Text, Box, Button } from "@mantine/core";
import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import PageContent from "../../../../common/components/PageContent/PageContent";
import TopSection from "../../../../common/components/TopSection/TopSection";
import { Roles } from "../../../../common/model/Roles";
import { useAuthContext } from "../../../authentication/hooks/useAuthContext";
import { useGetUsersQuery } from "../../../users/slice";
import AssignUserModal from "../../components/AssignUserModal/AssignUserModal";
import DeviceModal from "../../components/DeviceModal/DeviceModal";
import DeviceTable from "../../components/DeviceTable/DeviceTable";
import { Device } from "../../model/Device";
import { useGetDevicesQuery } from "../../slice";

const DevicesPage = () => {
  const { role } = useAuthContext();

  const { data: devices } = useGetDevicesQuery();
  const { data: users } = useGetUsersQuery(undefined, {
    skip: role === Roles.User,
  });

  const navigate = useNavigate();

  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userAssignModalOpen, setUserAssignModalOpen] = useState(false);

  const onAddClick = () => {
    setSelectedDevice(null);
    setEditModalOpen(true);
  };

  const onDeviceClick = (device: Device) => {
    const onClickAction = {
      [Roles.User]: onUserDeviceClick,
      [Roles.Admin]: onAdminDeviceClick,
    };
    onClickAction[role!](device);
  };

  const onUserDeviceClick = (device: Device) => {
    navigate("/devices/" + device.id);
  };

  const onAdminDeviceClick = (device: Device) => {
    setSelectedDevice(device);
    setEditModalOpen(true);
  };

  const onClose = () => {
    setEditModalOpen(false);
  };

  const onAssignToUser = (device: Device) => {
    setSelectedDevice(device);
    setUserAssignModalOpen(true);
  };

  const onCloseAssignUser = () => {
    setUserAssignModalOpen(false);
  };

  return (
    <PageContent>
      <TopSection>
        <Text size={20}>Devices</Text>
        <Button onClick={onAddClick}>Add Device</Button>
      </TopSection>

      <Box mt={15} />
      <DeviceTable
        devices={devices ?? []}
        onDeviceClick={onDeviceClick}
        onAssignToUser={onAssignToUser}
      />

      <DeviceModal
        open={editModalOpen}
        selectedDevice={selectedDevice}
        onClose={onClose}
      />

      <AssignUserModal
        open={userAssignModalOpen}
        users={users ?? []}
        onClose={onCloseAssignUser}
        selectedDevice={selectedDevice}
      />
    </PageContent>
  );
};

export default DevicesPage;
