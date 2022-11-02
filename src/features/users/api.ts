import { axiosInstance } from "../../api";

export const getUsers = () => {
  return axiosInstance.get("/users");
};
