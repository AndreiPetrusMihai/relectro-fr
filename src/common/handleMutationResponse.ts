import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

type ResponseType<T> =
  | {
      data: T;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const unwrapMutationResult = <T>(res: ResponseType<T>) => {
  if ("error" in res) {
    throw res.error;
  }
  return res;
};
