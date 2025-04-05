import { environment } from '../../environments/environment';

export const API_ROUTES = {
  BASE: environment.apiUrl,
  BUSINESS: `${environment.apiUrl}/businesses`,
};