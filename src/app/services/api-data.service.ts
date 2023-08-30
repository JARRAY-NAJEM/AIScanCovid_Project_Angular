import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiDataService {
  url = environment.url;
  constructor(private http: HttpClient) {}

  login(data: any): Promise<any> {
    const headers = { 'content-type': 'application/json' };
    return this.http.post(`${this.url}/login`, data, { headers }).toPromise();
  }

  scanner(formData: any) {
    const headers = { 'content-type': 'application/json' };
    return this.http.post(`${this.url}/scanner`, formData, { headers });
  }

  patient() {
    return this.http.get(`${this.url}/get`);
  }
}
