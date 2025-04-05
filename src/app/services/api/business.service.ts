import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Business } from '../../models/business.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api.model';
import { API_ROUTES } from '../../constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  public apiUrl = API_ROUTES.BUSINESS;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Business[]>> {
    return this.http.get<ApiResponse<Business[]>>(this.apiUrl);
  }

  create(data: Partial<Business>): Observable<ApiResponse<Business>> {
    return this.http.post<ApiResponse<Business>>(this.apiUrl, data);
  }

  getById(id: number): Observable<ApiResponse<Business>> {
    return this.http.get<ApiResponse<Business>>(`${this.apiUrl}/${id}`);
  }
}
