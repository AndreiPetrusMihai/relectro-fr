import { Menu, ActionIcon } from "@mantine/core";
import { IconDots } from "@tabler/icons";
import { ReactNode, SyntheticEvent, useState } from "react";
import { ContextMenuOption } from "../CustomTable/CustomTable";
import { ColumnConfig } from "../types";
import { useStyles } from "./styles";

type Props<I> = {
  item: I;
  onRowClick: (item: I) => void;
  contextMenuOptions?: ContextMenuOption<I>[];
  columnsConfig: ColumnConfig<I>[];
};

const CustomTableRow = <T extends object>({
  item,
  onRowClick,
  columnsConfig,
  contextMenuOptions,
}: Props<T>) => {
  const { classes } = useStyles();

  const [menuOpen, setMenuOpen] = useState(false);

  const onContextClick = (
    event: SyntheticEvent<HTMLButtonElement> | undefined
  ) => {
    event?.stopPropagation();
    setMenuOpen(true);
  };

  const onOptionClicked =
    (action: (item: T) => void) =>
    (event: SyntheticEvent<HTMLButtonElement> | undefined) => {
      event?.stopPropagation();
      action(item);
    };

  return (
    <tr className={classes.onHover} onClick={() => onRowClick(item)}>
      {columnsConfig.map((config) => {
        // Casting it even if we're sure, downfall of typescript

        if ("itemKey" in config) {
          const val = item[config.itemKey] as ReactNode;
          return <td key={config.headerName}>{val}</td>;
        }

        return <td key={config.headerName}>{config.mappingFunction(item)}</td>;
      })}

      {contextMenuOptions && (
        <td>
          <Menu opened={menuOpen} onChange={setMenuOpen}>
            <Menu.Target>
              <ActionIcon variant="default" ml="70%" onClick={onContextClick}>
                <IconDots />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {contextMenuOptions.map((menuOption) => (
                <Menu.Item
                  key={menuOption.text}
                  icon={<menuOption.IconComponent size={14} />}
                  onClick={onOptionClicked(menuOption.action)}
                >
                  {menuOption.text}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </td>
      )}
    </tr>
  );
};

export default CustomTableRow;
