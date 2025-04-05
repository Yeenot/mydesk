export enum BusinessIndustry {
  Technology = "technology",
  Finance = "finance",
  Education = "education",
  Manufacturing = "manufacturing",
}

export enum BusinessCountry {
  Australia = 'AU',
  Philippines = 'PH',
}

export enum BusinessStatus {
  Active = "active",
  Inactive = "inactive",
}

export interface Business {
  id: number,
  name: string;
  bio: string;
  industry: BusinessIndustry;
  country: BusinessCountry;
  email: string;
  is_active: boolean;
}