import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdressService {
  

  constructor(private httpClient:HttpClient) { }
  saveadress(adress){
    const adres = JSON.parse(localStorage.getItem('currentUser'));

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const token = localStorage.getItem('token');
   // headers = headers.set('Authorization', 'Bearer ' +user.token);
    let us= JSON.stringify(adress);
    console.log(us)
    return this.httpClient.post(CONFIG.URL + "adress/save",us,{ headers: headers, responseType: 'text' });
  }

  getadresse(adres){
    const adresse= this.httpClient.get(CONFIG.URL +'adress/GetAll');
    return adresse;
  }


  getClientbyid(id){
    const adresse= this.httpClient.get(CONFIG.URL+'adress/find/{id}/'+id);
    return adresse;
  }



}
