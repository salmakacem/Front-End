import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONFIG } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidercodeService {

  constructor( private httpClient: HttpClient) { }

  Updatemp(code: string, Key: string): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('key', Key);
    params = params.append('code', code);
  
    let url = CONFIG.URL+  'auth/finish'  ;
    console.log(url);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
   
 
    return this.httpClient.post(url, JSON.stringify({
      code: code, Key: Key
    } || null)
      , { params: params, responseType: 'text' })
      .pipe(map((response: any) =>response));
      ;
  }
}

