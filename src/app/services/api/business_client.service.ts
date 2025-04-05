import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../models/client.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api.model';
import { API_ROUTES } from '../../constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class BusinessClientService {
  public apiUrl = API_ROUTES.BUSINESS;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Client[]>> {
    return this.http.get<ApiResponse<Client[]>>(`${this.apiUrl}/clients`);
  }

  addClientToBusiness(client_id: number): Observable<ApiResponse<Client>> {
    return this.http.post<ApiResponse<Client>>(`${this.apiUrl}/clients`, { user_id: client_id });
  }

  getById(client_id: number): Observable<ApiResponse<Client>> {
    return this.http.get<ApiResponse<Client>>(`${this.apiUrl}/clients/${client_id}`);
  }
}
