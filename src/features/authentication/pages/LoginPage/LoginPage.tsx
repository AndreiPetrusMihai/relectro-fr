import {
  BackgroundImage,
  Button,
  Card,
  Center,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import * as Yup from "yup";
import { LoginParams } from "../../apiSlice";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLoginUserMutation } from "../../apiSlice";
import { useStyles } from "./styles";

const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email required").email("Invalid email"),
  password: Yup.string().required("Password required"),
});

const LoginPage = () => {
  const { classes } = useStyles();

  const { login } = useAuthContext();

  const [loginRequest] = useLoginUserMutation();

  const { getInputProps, onSubmit } = useForm({
    initialValues: {
      email: "a@gmail.com",
      password: "123",
    },
    validate: yupResolver(loginSchema),
  });

  const onLoginSubmit = (values: LoginParams) => {
    loginRequest(values)
      .unwrap()
      .then((token) => login(token))
      .catch((er) => {
        showNotification({
          title: "Login failed",
          message: "",
          color: "red",
        });
      });
  };

  return (
    <BackgroundImage
      src="../../../../../src/assets/login-background.svg"
      className={classes.fullSize}
    >
      <Center sx={{ height: "80%" }}>
        <Card
          className={classes.formCard}
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
        >
          <Card.Section withBorder className={classes.cardSection}>
            <Title order={2}>Welcome!</Title>
          </Card.Section>
          <Card.Section className={classes.cardSection}>
            <form onSubmit={onSubmit((values) => onLoginSubmit(values))}>
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
              <Button type="submit" mt="sm">
                Login
              </Button>
            </form>
          </Card.Section>
        </Card>
      </Center>
    </BackgroundImage>
  );
};

export default LoginPage;
