import { ReactNode } from "react";
import { ReactKeys } from "../../../features/users/types/ReactElementKeys";

export type ColumnConfig<I> = ExplicitColumnConfig<I> | ImplicitColumnConfig<I>;

type ImplicitColumnConfig<I> = {
  headerName: string;
  itemKey: keyof ReactKeys<I>;
};

type ExplicitColumnConfig<I> = {
  headerName: string;
  mappingFunction: (item: I) => ReactNode;
};
