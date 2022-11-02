import { mapResponseData } from "../../common/helpers/mapResponseData";
import { relectroApi } from "../../store/api";

export type LoginParams = {
  email: string;
  password: string;
};

export const userApi = relectroApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<string, LoginParams>({
      query: ({ email, password }) => ({
        url: `users/login`,
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      transformResponse: (response: { token: string }) => {
        const data = mapResponseData(response);
        return data.token;
      },
    }),
  }),
});

export const { useLoginUserMutation } = userApi;

const userReducer = userApi.reducer;
export default userReducer;
