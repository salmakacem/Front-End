import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Adress } from "src/app/adress";
import { Details } from "src/app/details";
import { CONFIG } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class Gestionadherents1Service {

    constructor(private http:HttpClient){}


    getAdresse(id) : Observable<Adress[]>{
      console.log(id);
      const  token = localStorage.getItem('token');
      const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
      return this.http.get<Adress[]>(CONFIG.URL +'adress/getadress/'+id,{ headers: headers });

    }

    getDetails(id) : Observable<Details[]> {
     
      
      const  token = localStorage.getItem('token');
      const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
      return this.http.get<Details[]>(CONFIG.URL +'user-details/detailByIdUser/'+id,{ headers: headers });

    }

    deleteAdress(adress:Adress) : Observable<Adress[]>{
    console.log(adress.id);
    
      const  token = localStorage.getItem('token');
      const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
      return this.http.delete<Adress[]>(CONFIG.URL+'adress/delete/'+adress.id,{ headers: headers });
      
    }

    deleteDetail(detail:Details): Observable<Details[]>{
        const  token = localStorage.getItem('token');
        const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
      return this.http.delete<Details[]>(CONFIG.URL+'user-details/'+detail.id,{ headers: headers });

      }

      


      updateDetail(detail:Details) {
        const  token = localStorage.getItem('token');
        const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
        return this.http.put(CONFIG.URL+'user-details/Dto/'+detail.id,detail,{ headers: headers });

      }

      updateAdresse(adresse:Adress) {
        const  token = localStorage.getItem('token');
        const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
        return this.http.put(CONFIG.URL+'adress/updat/'+adresse.id,adresse,{ headers: headers });

      }
    
}