import { mapResponseData } from "../../common/helpers/mapResponseData";
import { relectroApi } from "../../store/api";
import { Device } from "./model/Device";

export const devicesApi = relectroApi.injectEndpoints({
  endpoints: (builder) => ({
    getDevices: builder.query<Device[], void>({
      query: () => ({
        url: "devices",
        method: "GET",
      }),
      transformResponse: (response: Device[]) => {
        const data = mapResponseData(response);
        return data;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Device" as const, id })),
              "Device",
            ]
          : ["Device"],
    }),
    addDevice: builder.mutation<Device, Omit<Device, "id" | "ownerId">>({
      query: (newDevice) => ({
        url: "devices",
        method: "POST",
        body: newDevice,
      }),
      transformResponse: (response: Device) => {
        const data = mapResponseData(response);
        return data;
      },
      invalidatesTags: ["Device"],
    }),
    updateDevice: builder.mutation<Device, Device>({
      query: (device) => ({
        url: `devices/${device.id}`,
        method: "PUT",
        body: device,
      }),
      transformResponse: (response: Device) => {
        const data = mapResponseData(response);
        return data;
      },
      invalidatesTags: (Device) =>
        Device ? [{ type: "Device", id: Device.id }] : [],
    }),
    deleteDevice: builder.mutation<void, number>({
      query: (id) => ({
        url: `devices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Device", id }],
    }),
    assignToUser: builder.mutation<void, { deviceId: number; userId: number }>({
      query: ({ deviceId, userId }) => ({
        url: `devices/${deviceId}`,
        method: "PATCH",
        body: { userId },
      }),
      invalidatesTags: (_, __, { deviceId }) => [{ type: "Device", deviceId }],
    }),
  }),
});

export const {
  useAddDeviceMutation,
  useDeleteDeviceMutation,
  useAssignToUserMutation,
  useGetDevicesQuery,
  useUpdateDeviceMutation,
} = devicesApi;

const DevicesReducer = devicesApi.reducer;
export default DevicesReducer;
