import { User } from "../../users/model/User";

export type Device = {
  id: number;
  name: string;
  description: string;
  address: string;
  maxHourlyEnergyConsuption: number;
  ownerId: number;
  owner?: User;
};
