import { createSlice } from "@reduxjs/toolkit";
import { AuthUserData } from "./contexts/AuthContext";

const initialState: AuthUserData = {
  authToken: undefined,
  email: undefined,
  name: undefined,
  id: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(_, { payload }) {
      return payload;
    },
  },
});

export const { loginUser } = authSlice.actions;
export default authSlice.reducer;
