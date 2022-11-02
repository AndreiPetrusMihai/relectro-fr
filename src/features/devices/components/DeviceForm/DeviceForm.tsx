import { useForm, yupResolver } from "@mantine/form";
import { Device } from "../../model/Device";
import { useAddDeviceMutation, useUpdateDeviceMutation } from "../../slice";
import * as Yup from "yup";
import {
  TextInput,
  Group,
  Center,
  Button,
  Loader,
  Tooltip,
  Box,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";

type Props = {
  device: Device | null;
  onSubmit: () => void;
};

type FormData = Pick<
  Device,
  "name" | "description" | "address" | "maxHourlyEnergyConsuption"
>;

const DeviceForm = ({ device, onSubmit: onSubmitProp }: Props) => {
  const [addDevice] = useAddDeviceMutation();
  const [updateDevice, { isLoading }] = useUpdateDeviceMutation();

  const { getInputProps, onSubmit, isDirty } = useForm<FormData>({
    initialValues: {
      name: device ? device.name : "",
      description: device ? device.description : "",
      address: device ? device.address : "",
      maxHourlyEnergyConsuption: device ? device.maxHourlyEnergyConsuption : 1,
    },
    validate: yupResolver(
      Yup.object({
        name: Yup.string().required(),
        description: Yup.string().required(),
        address: Yup.string().required(),
        maxHourlyEnergyConsuption: Yup.string().required(),
      })
    ),
  });

  const onFormSubmit = (values: FormData) => {
    if (device) {
      updateDevice({ ...device, ...values })
        .unwrap()
        .then(onSubmitProp)
        .catch(() => {
          showNotification({
            title: "Saving failed",
            message: "",
            color: "red",
          });
        });
    } else {
      addDevice({ ...values })
        .unwrap()
        .then(onSubmitProp)
        .catch(() => {
          showNotification({
            title: "Adding a device failed",
            message: "",
            color: "red",
          });
        });
    }
  };

  const formUnchanged = !isDirty();

  return (
    <form onSubmit={onSubmit((values) => onFormSubmit(values))}>
      <TextInput label="Name" placeholder="Name" {...getInputProps("name")} />
      <TextInput
        label="Description"
        placeholder="Description"
        {...getInputProps("description")}
      />
      <TextInput
        label="Address"
        placeholder="Address"
        {...getInputProps("address")}
      />
      <TextInput
        label="Max Hourly Consumption Rate"
        placeholder="Max Hourly Consumption Rate"
        {...getInputProps("maxHourlyEnergyConsuption")}
      />

      <Group position="left" mt="sm">
        <Center>
          <Tooltip
            position="bottom"
            disabled={!formUnchanged}
            label={"No changes were made"}
          >
            <Box>
              <Button type="submit" disabled={formUnchanged}>
                {device ? "Save Changes" : "Add Device"}
              </Button>
            </Box>
          </Tooltip>
        </Center>
        {isLoading && (
          <Center>
            <Loader variant="dots" />
          </Center>
        )}
      </Group>
    </form>
  );
};

export default DeviceForm;
