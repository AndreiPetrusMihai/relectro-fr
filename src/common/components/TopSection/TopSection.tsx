import { Grid } from "@mantine/core";
import { ComponentProps, FCWC } from "react";

type Props = ComponentProps<typeof Grid>;

const TopSection: FCWC<Props> = ({ children, ...gridProps }) => {
  return (
    <Grid m={8} justify="space-between" align="center" {...gridProps}>
      {children}
    </Grid>
  );
};

export default TopSection;
