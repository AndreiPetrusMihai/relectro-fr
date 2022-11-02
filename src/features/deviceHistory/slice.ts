import { ConsumptionData } from "./model/ConsumptionData";
import { mapResponseData } from "../../common/helpers/mapResponseData";
import { relectroApi } from "../../store/api";
import { Device } from "../devices/model/Device";

export const deviceApi = relectroApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getDeviceConsumptionData: builder.query<
      ConsumptionData[],
      { deviceId: number; day: number; month: number }
    >({
      query: ({ deviceId, day, month }) => ({
        url: `logs/${deviceId}/${month}/${day}`,
        method: "GET",
      }),
      transformResponse: (response: ConsumptionData[]) => {
        const data = mapResponseData(response);
        return data;
      },
      providesTags: (_, __, { deviceId }) => [
        {
          type: "ConsumptionData" as const,
          id: deviceId,
        },
      ],
    }),
    getDevice: builder.query<Device, { deviceId: number }>({
      query: ({ deviceId }) => ({
        url: `devices?_expand=user&aid=${deviceId}`,
        method: "GET",
      }),
      transformResponse: (response: Device[]) => {
        const data = mapResponseData(response);
        return data[0];
      },
      providesTags: (_, __, { deviceId }) => [
        {
          type: "Device" as const,
          id: deviceId,
        },
      ],
    }),
  }),
});

export const { useGetDeviceConsumptionDataQuery, useGetDeviceQuery } =
  deviceApi;
