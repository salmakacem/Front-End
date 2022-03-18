import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private httpClient:HttpClient) { }
  
  saveD(details){
    const detail = JSON.parse(localStorage.getItem('currentUser'));

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const token = localStorage.getItem('token');
   // headers = headers.set('Authorization', 'Bearer ' +user.token);
    let us= JSON.stringify(details);
console.log(us)
    return this.httpClient.post(CONFIG.URL + "user-details/ajoutd",us,{ headers: headers, responseType: 'text' });
  }
}
