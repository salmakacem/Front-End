import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
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


      deleteAdresse(id){
        const  token = localStorage.getItem('token');
        const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
        return this.http.delete<Adress[]>(CONFIG.URL +'adress/GetAll/'+id,{ headers: headers });
        
      }

      upload_photo(data,id){
        const  token = localStorage.getItem('token');
        const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
        let params = new HttpParams();
        params = params.set('id', id);
         return this.http.post(CONFIG.URL+"users/upload_photo_c",data,{ headers: headers,params:params, responseType: 'text' });
      }
   
      getphoto(id){
        const  token = localStorage.getItem('token');
        const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
        
        // let params = new HttpParams();
        // params = params.set('id', id);
         return this.http.get(CONFIG.URL+"users/get_photo_c/"+id,{ headers: headers, responseType: 'json' });
      }
  
      
  }