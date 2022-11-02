import { useMemo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import { ConsumptionData } from "../../model/ConsumptionData";

type Props = {
  consumptionHistory: ConsumptionData[];
};

const EnergyGraph = ({ consumptionHistory }: Props) => {
  const consumptionData = useMemo(
    () =>
      consumptionHistory.map((cd) => ({
        consumed: cd.consumption,
        hour: cd.hour,
        "mW consumed": cd.consumption,
      })),
    [consumptionHistory]
  );
  return (
    <ResponsiveContainer width="100%" height={700}>
      <LineChart
        data={consumptionData}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <Line type="monotone" dataKey="mW consumed" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <XAxis dataKey="hour" interval={0} type="number" domain={[0, 24]}>
          <Label value="Hour" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis
          dataKey="consumed"
          domain={["dataMin - 5", "dataMax + 5"]}
          label={{
            value: "Consumption in mW",
            angle: -90,
            offset: 20,
            position: "center",
            textAnchor: "middle",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EnergyGraph;
