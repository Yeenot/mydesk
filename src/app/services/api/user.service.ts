import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../models/api.model';
import { BusinessUser, User } from '../../models/user.model';

import { API_ROUTES } from '../../constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public apiUrl = API_ROUTES.BUSINESS;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<BusinessUser[]>> {
    return this.http.get<ApiResponse<BusinessUser[]>>(`${this.apiUrl}/users`);
  }

  create(data: Partial<User>): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/users`, data);
  }

  getById(user_id: number): Observable<ApiResponse<BusinessUser>> {
    return this.http.get<ApiResponse<BusinessUser>>(`${this.apiUrl}/users/${user_id}`);
  }
}
