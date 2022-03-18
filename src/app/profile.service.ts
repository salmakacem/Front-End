import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  

  

  constructor(private http: HttpClient) { }

  getUSER(){
    const user= this.http.get(CONFIG.URL +'users/GetAll');
    return user;
  }

  getadresse(){
    const adresse= this.http.get(CONFIG.URL +'adress/GetAll');
    return adresse;
  }


  getdetail(){
    const detail= this.http.get(CONFIG.URL +'user-details/GetAll');
    return detail;
  }



}
