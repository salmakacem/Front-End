import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adress } from 'src/app/adress';
import { Details } from 'src/app/details';
import { Users } from 'src/app/users';
import { CONFIG } from 'src/environments/environment';





@Injectable({
    providedIn: 'root'
  })
  export class GestionadherentsService {

    constructor(private http:HttpClient){}


    getAdresse() : Observable<Adress[]>{
      const  token = localStorage.getItem('token');
      const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
      return this.http.get<Adress[]>(CONFIG.URL +'adress/GetAll/',{ headers: headers });

    }

    getDetails() : Observable<Details[]> {
      const  token = localStorage.getItem('token');
      const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
      return this.http.get<Details[]>(CONFIG.URL +'user-details/GetAll/',{ headers: headers });

    }
    getUser() : Observable<Users[]> {
      const  token = localStorage.getItem('token');
      const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
      return this.http.get<Users[]>(CONFIG.URL +'users/GetAll/',{ headers: headers });

    }

   


    
    



  }