
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient:HttpClient) { }
  
  Save(users){
    const user = JSON.parse(localStorage.getItem('currentUser'));

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const token = localStorage.getItem('token');
   // headers = headers.set('Authorization', 'Bearer ' +user.token);
    let us= JSON.stringify(users);

    return this.httpClient.post(CONFIG.URL + "users/ajout",users,{ headers: headers, responseType: 'text' });
  }
}
