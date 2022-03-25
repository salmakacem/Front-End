import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONFIG } from 'src/environments/environment';
import { map } from "rxjs/operators"; 
import { Key } from 'protractor';
import { keyframes } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ForgotloginService {
  
 
 

  constructor( private httpClient: HttpClient) { 
 
  }
  createAuthorizationHeader(headers: Headers) {
    var token = localStorage.getItem('token');
    headers.append('Authorization', 'Bearer ' + token);
  }
  Restlogin(email: any): Observable<any[]> {
 
    console.log(email);

    let params = new HttpParams();
    params = params.append('email', email);

    let url = CONFIG.URL + 'auth/reset-password/init';
    console.log(url);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
   
    //let urltosend="http://localhost:4200" ;
    return this.httpClient.post(url, JSON.stringify({

     }|| null)
      , { params: params,headers: headers, responseType: 'text' })
      .pipe(map((response: any) =>response));
      
       ;
  }
  Updatemp(password: string, Key: string): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('key', Key);
    params = params.append('newPassword', password);
  
    let url = CONFIG.URL+  'auth/reset-password/finish'  ;
    console.log(url);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
   
 
    return this.httpClient.post(url, JSON.stringify({
      password: password, Key: Key
    } || null)
      , { params: params, responseType: 'text' })
      .pipe(map((response: any) =>response));
      ;
  }

}
