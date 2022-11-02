import { PropsWithChildren } from "react";

declare module "react" {
  export type FCWC<P = {}> = FC<PropsWithChildren<P>>;
}
