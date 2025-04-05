export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
}

export enum UserType {
  Superadmin = 'superadmin',
  Business = 'business',
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_type: UserType;
  is_active: boolean;
}

export interface AuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_type: UserType;
  business_user_id: number,
  business_id: number,
  role_id: number,
  token: string,  
}

export interface BusinessUser {
  id: number;
  business_id: number;
  user: User;
}