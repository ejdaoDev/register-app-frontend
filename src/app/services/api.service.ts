import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseI } from '../interfaces/response.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    url: string = 'http://localhost:3000/api/';

    headers() {
        let headers = new HttpHeaders();
        headers = headers.append('x-access-token', '' + localStorage.getItem('auth_token'));
        headers = headers.append('Accept', 'application/json');
        return headers;
    }

    constructor(private http: HttpClient) { }

    post(form: any, route: string): Observable<ResponseI> {
        let headers = this.headers();
        let url = this.url + route;
        return this.http.post<ResponseI>(url, form, { headers });
    }

    put(form: any, route: string): Observable<ResponseI> {
        let headers = this.headers();
        let url = this.url + route;
        return this.http.put<ResponseI>(url, form, { headers });
    }

    get(route: string): Observable<ResponseI> {
        let headers = this.headers();
        let url = this.url + route;
        return this.http.get<ResponseI>(url, { headers });
    }

    delete(route: string): Observable<ResponseI> {
        let headers = this.headers();
        let url = this.url + route;
        return this.http.delete<ResponseI>(url, { headers });
    }
}
