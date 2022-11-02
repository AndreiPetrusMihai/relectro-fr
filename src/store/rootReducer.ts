import { relectroApi } from "./api";
import authReducer from "../features/authentication/slice";

export const rootReducer = {
  [relectroApi.reducerPath]: relectroApi.reducer,
  auth: authReducer,
};
