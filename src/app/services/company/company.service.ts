import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseURL = 'http://localhost:4200';

  constructor(private http: HttpClient) { }

  public getCompanyData(fileURL: string): Observable<any> {
    return this.http.get(this.baseURL + fileURL);
  }
}
