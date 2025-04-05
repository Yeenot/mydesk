import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../../models/service.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api.model';
import { API_ROUTES } from '../../constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  public apiUrl = API_ROUTES.BUSINESS;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Service[]>> {
    return this.http.get<ApiResponse<Service[]>>(`${this.apiUrl}/services`);
  }

  create(data: Partial<Service>): Observable<ApiResponse<Service>> {
    return this.http.post<ApiResponse<Service>>(`${this.apiUrl}/services`, data);
  }

  getById(service_id: number): Observable<ApiResponse<Service>> {
    return this.http.get<ApiResponse<Service>>(`${this.apiUrl}/services/${service_id}`);
  }
}
