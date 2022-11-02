import { Modal } from "@mantine/core";
import { Device } from "../../model/Device";
import DeviceForm from "../DeviceForm/DeviceForm";

type Props = {
  open: boolean;
  selectedDevice: Device | null;
  onClose: () => void;
};

const DeviceModal = ({ open, selectedDevice, onClose }: Props) => {
  const modalTitle = selectedDevice
    ? `Editting device: ${selectedDevice.name}`
    : "Add device";

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={modalTitle}
      style={{ padding: 20 }}
    >
      <DeviceForm device={selectedDevice} onSubmit={onClose} />
    </Modal>
  );
};

export default DeviceModal;
