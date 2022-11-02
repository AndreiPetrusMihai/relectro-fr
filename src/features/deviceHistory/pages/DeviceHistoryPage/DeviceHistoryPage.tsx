import { useParams } from "react-router-dom";
import PageContent from "../../../../common/components/PageContent/PageContent";
import TopSection from "../../../../common/components/TopSection/TopSection";
import { Divider, Group, Text } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useState } from "react";
import EnergyGraph from "../../components/EnergyGraph/EnergyGraph";
import {
  useGetDeviceConsumptionDataQuery,
  useGetDeviceQuery,
} from "../../slice";

const DeviceHistoryPage = () => {
  const { deviceId } = useParams();
  const [value, setValue] = useState<Date | null>(null);

  const { data: device } = useGetDeviceQuery({ deviceId: parseInt(deviceId!) });
  const { data: consumptionData } = useGetDeviceConsumptionDataQuery(
    {
      deviceId: parseInt(deviceId!),
      day: value?.getDay()! - 1,
      month: value?.getMonth()! + 1,
    },
    { skip: value?.getDay() === undefined }
  );

  return (
    <PageContent>
      <TopSection justify="flex-start" align="end">
        <Text size={20}>Device energy consumption history for </Text>
        <Text italic size={20} ml={10}>
          {device?.name}
        </Text>
      </TopSection>
      <Divider />
      <Group noWrap>
        <Calendar value={value} onChange={setValue} />
        <Divider orientation="vertical" />
        <EnergyGraph consumptionHistory={consumptionData ?? []} />
      </Group>
      <Divider />
    </PageContent>
  );
};

export default DeviceHistoryPage;
