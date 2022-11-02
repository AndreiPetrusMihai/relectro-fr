import { Button, Modal, Select, Space } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { User } from "../../../users/model/User";
import { Device } from "../../model/Device";
import { useAssignToUserMutation } from "../../slice";

type Props = {
  open: boolean;
  users: User[];
  onClose: () => void;
  selectedDevice: Device | null;
};

const AssignUserModal = ({ open, users, onClose, selectedDevice }: Props) => {
  const [assignToUser] = useAssignToUserMutation();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedUserId(selectedDevice?.owner?.id.toString()!);
  }, [selectedDevice]);

  const onConfirm = () => {
    assignToUser({
      deviceId: selectedDevice!.id,
      userId:
        selectedUserId === null
          ? ("" as any as number)
          : parseInt(selectedUserId!),
    })
      .unwrap()
      .then(onClose)
      .catch(() => {
        showNotification({
          title: "Device assignment failed",
          message: "",
          color: "red",
        });
      });
  };

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={"Assign device to a user"}
      style={{ padding: 20 }}
    >
      <Select
        label="Username"
        placeholder="Search user"
        searchable
        clearable
        value={selectedUserId}
        defaultValue={selectedDevice?.owner?.name}
        nothingFound="No user with such name"
        onChange={(value) => setSelectedUserId(value)}
        data={users.map((u) => ({ label: u.name, value: u.id.toString() }))}
      />
      <Space h="md" />
      <Button onClick={onConfirm}>Assign To User</Button>
    </Modal>
  );
};

export default AssignUserModal;
