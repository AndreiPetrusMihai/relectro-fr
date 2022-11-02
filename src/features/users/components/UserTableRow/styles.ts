import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  onHover: {
    ":hover": {
      backgroundColor: theme.other.themeHoverColor(theme),
      cursor: "pointer",
    },
  },
}));
