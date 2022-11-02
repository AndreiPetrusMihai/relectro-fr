import React, { FCWC } from "react";
import { ColumnConfig } from "../types";

type Props<T> = {
  columnsConfig: ColumnConfig<T>[];
  hasContextMenu: boolean;
};

const CustomTableHeader = <T extends object>({
  columnsConfig,
  hasContextMenu,
}: Props<T>) => {
  return (
    <thead>
      <tr>
        {columnsConfig.map((c) => (
          <th key={c.headerName}>{c.headerName}</th>
        ))}
        {hasContextMenu && <th />}
      </tr>
    </thead>
  );
};

export default CustomTableHeader;
