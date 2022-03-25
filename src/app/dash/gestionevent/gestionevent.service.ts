import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Adress } from "src/app/adress";
import { CONFIG } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class GestioneventService {
    
    constructor(private http:HttpClient){}

    getAdress() : Observable<Adress[]>{
        const  token = localStorage.getItem('token');
        const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
        return this.http.get<Adress[]>(CONFIG.URL +'adress/GetAll/',{ headers: headers });
  
      }

      
  }