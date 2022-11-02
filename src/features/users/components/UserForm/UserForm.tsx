import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Loader,
  Center,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { User } from "../../model/User";
import { useAddUserMutation, useUpdateUserMutation } from "../../slice";
import * as Yup from "yup";

type Props = {
  user: User | null;
  onSubmit: () => void;
};

type FormData = Omit<User, "id">;

const UserForm = ({ user, onSubmit: onSubmitProp }: Props) => {
  const [addUser] = useAddUserMutation();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { getInputProps, onSubmit } = useForm<FormData>({
    initialValues: {
      name: user ? user.name : "",
      email: user ? user.email : "",
      password: user ? user.password : "",
    },
    validate: yupResolver(
      Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      })
    ),
  });

  const onFormSubmit = (values: FormData) => {
    if (user) {
      updateUser({ ...user, ...values })
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
      addUser(values)
        .unwrap()
        .then(onSubmitProp)
        .catch(() => {
          showNotification({
            title: "Adding a user failed",
            message: "",
            color: "red",
          });
        });
    }
  };

  return (
    <form onSubmit={onSubmit((values) => onFormSubmit(values))}>
      <TextInput label="Name" placeholder="Name" {...getInputProps("name")} />
      <TextInput
        label="Email"
        placeholder="Email"
        {...getInputProps("email")}
      />
      <PasswordInput
        mt="sm"
        label="Password"
        placeholder="Password"
        {...getInputProps("password")}
      />
      <Group position="left" mt="sm">
        <Center>
          <Button type="submit">{user ? "Save Changes" : "Add Users"}</Button>
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

export default UserForm;
