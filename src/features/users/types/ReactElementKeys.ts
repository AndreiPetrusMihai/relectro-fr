import { ReactElement, ReactNode } from "react";

export type ReactKeys<T> = {
  [P in keyof T as T[P] extends ReactNode ? P : never]: T[P];
};
