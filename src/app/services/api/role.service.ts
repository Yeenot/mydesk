import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../../models/role.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api.model';
import { API_ROUTES } from '../../constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  public apiUrl = API_ROUTES.BUSINESS;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Role[]>> {
    return this.http.get<ApiResponse<Role[]>>(`${this.apiUrl}/roles`);
  }

  create(data: Partial<Role>): Observable<ApiResponse<Role>> {
    return this.http.post<ApiResponse<Role>>(`${this.apiUrl}/roles`, data);
  }

  getById(role_id: number): Observable<ApiResponse<Role>> {
    return this.http.get<ApiResponse<Role>>(`${this.apiUrl}/roles/${role_id}`);
  }
}
