import { Modal, Overlay } from "@mantine/core";
import { AnimationEventHandler } from "react";
import { User } from "../../model/User";
import UserForm from "../UserForm/UserForm";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedUser: User | null;
};

const UserModal = ({ open, onClose, selectedUser }: Props) => {
  const modalTitle = selectedUser
    ? `Editting user: ${selectedUser.name}`
    : "Add user";

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={modalTitle}
      style={{ padding: 20 }}
    >
      <UserForm user={selectedUser} onSubmit={onClose} />
    </Modal>
  );
};

export default UserModal;
