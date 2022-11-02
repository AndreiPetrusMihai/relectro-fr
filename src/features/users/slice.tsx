import { mapResponseData } from "../../common/helpers/mapResponseData";
import { relectroApi } from "../../store/api";
import { User } from "./model/User";

export const usersApi = relectroApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: "users",
        method: "GET",
      }),
      transformResponse: (response: User[]) => {
        const data = mapResponseData(response);
        return data;
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "User" as const, id })), "User"]
          : ["User"],
    }),
    addUser: builder.mutation<User, Omit<User, "id">>({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
      transformResponse: (response: User) => {
        const data = mapResponseData(response);
        return data;
      },
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<User, User>({
      query: (user) => ({
        url: `users/${user.id}`,
        method: "PUT",
        body: user,
      }),
      transformResponse: (response: User) => {
        const data = mapResponseData(response);
        return data;
      },
      invalidatesTags: (user) => (user ? [{ type: "User", id: user.id }] : []),
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "User", id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
