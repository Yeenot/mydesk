import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../../models/resource.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api.model';
import { API_ROUTES } from '../../constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  public apiUrl = API_ROUTES.BUSINESS;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Resource[]>> {
    return this.http.get<ApiResponse<Resource[]>>(`${this.apiUrl}/resources`);
  }

  create(data: Partial<Resource>): Observable<ApiResponse<Resource>> {
    return this.http.post<ApiResponse<Resource>>(`${this.apiUrl}/resources`, data);
  }

  getById(resource_id: number): Observable<ApiResponse<Resource>> {
    return this.http.get<ApiResponse<Resource>>(`${this.apiUrl}/resources/${resource_id}`);
  }
}
