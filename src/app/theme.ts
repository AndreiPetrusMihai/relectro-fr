import { MantineTheme } from "@mantine/core";

const themeHoverColor = (theme: MantineTheme) =>
  theme.fn.variant({
    variant: "light",
    color: theme.primaryColor,
  }).background;

export const theme: Partial<MantineTheme> = {
  primaryColor: "teal",
  other: {
    themeHoverColor,
  },
};
