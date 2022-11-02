import { Box } from "@mantine/core";
import { FCWC } from "react";
import { appShellPadding } from "../../../app/Layout/Layout";

const PageContent: FCWC = ({ children }) => {
  return (
    <Box pt={40} sx={{ height: `calc(100% - ${appShellPadding * 2}px)` }}>
      {children}
    </Box>
  );
};

export default PageContent;
