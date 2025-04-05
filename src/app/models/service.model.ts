export enum ServiceStatus {
  Active = "active",
  Inactive = "inactive",
}

export interface Service {
  id: number,
  name: string;
  description: string;
  price: number;
  business_id: number,
  is_active: boolean;
}