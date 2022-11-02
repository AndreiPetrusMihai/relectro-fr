import { Table } from "@mantine/core";
import { TablerIcon } from "@tabler/icons";
import CustomTableHeader from "../CustomTableHeader/CustomTableHeader";
import CustomTableRow from "../CustomTableRow/CustomTableRow";
import { ColumnConfig } from "../types";

export type ContextMenuOption<I> = {
  text: string;
  action: (item: I) => void;
  IconComponent: TablerIcon;
};

type Props<I extends { id: number }> = {
  items: I[];
  columnsConfig: ColumnConfig<I>[];
  contextMenuOptions?: ContextMenuOption<I>[];
  onRowClick: (item: I) => void;
};

const CustomTable = <I extends { id: number }>({
  items,
  onRowClick,
  columnsConfig,
  contextMenuOptions,
}: Props<I>) => {
  return (
    <Table sx={{ minWidth: 700 }}>
      <CustomTableHeader
        columnsConfig={columnsConfig}
        hasContextMenu={!!contextMenuOptions}
      />
      <tbody>
        {items.map((item) => (
          <CustomTableRow
            key={item.id}
            item={item}
            onRowClick={onRowClick}
            columnsConfig={columnsConfig}
            contextMenuOptions={contextMenuOptions}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default CustomTable;
