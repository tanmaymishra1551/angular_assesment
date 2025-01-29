import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CompanyService {
    private apiUrl = 'http://localhost:8000/api/v1/form/getCompanyData';  
    constructor(private http: HttpClient) { }

    getCompanies(): Observable<string[]> {
        return this.http.get<{ companies: { company_name: string }[] }>(this.apiUrl).pipe(
            map((response: { companies: { company_name: string }[] }) => response.companies.map(company => company.company_name)) 
        );
    }
}
