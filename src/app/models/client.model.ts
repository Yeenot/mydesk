import { User } from "./user.model";

export enum ClientStatus {
  Active = "active",
  Inactive = "inactive",
}

export enum ClientState {
  Pending = "pending",
  Accepted = "accepted",
}


export const ClientStateLabel: Record<ClientState, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
};

export interface Client {
  id: number,
  user: User,
}