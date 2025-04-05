export enum RoleStatus {
  Active = "active",
  Inactive = "inactive",
}

export interface Role {
  id: number;
  name: string;
  is_active: boolean;
}