import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Adress } from "src/app/adress";
import { CONFIG } from "src/environments/environment";
import { Event } from "src/app/event";

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

  ajouterevent(event){
    console.log(event);
    
  const  token = localStorage.getItem('token');
  const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
   return this.http.post(CONFIG.URL+'event/save',event,{ headers: headers });
}
      deleteAdresse(id){
        const  token = localStorage.getItem('token');
        const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
        return this.http.delete<Adress[]>(CONFIG.URL +'adress/GetAll/'+id,{ headers: headers });
        
      }

 
   
         getEvent(){
        const  token = localStorage.getItem('token');
        const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
        return this.http.get(CONFIG.URL +'event/',{ headers: headers });
  
      }
  
      deleteEvent(event:Event) : Observable<Event[]>{
        const  token = localStorage.getItem('token');
        const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
       return this.http.delete<Event[]>(CONFIG.URL+'event/delete/'+ event.id,{ headers: headers });
      }
   
  
      updateevent(event){

        // const users = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    
        const token = localStorage.getItem('token');
        headers = headers.set("Authorization", 'Bearer ' + token);
        
        return this.http.put(CONFIG.URL + 'event/updat/'+event.id,event,{ headers: headers, responseType: 'text' });
        }
        updateUser(event:Event) {
          const  token = localStorage.getItem('token');
          const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
          return this.http.put(CONFIG.URL+'event/updat/'+event.id,event,{ headers: headers });
  
        }
      
  
      upload_photo(data,id){
        const  token = localStorage.getItem('token');
        const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
        let params = new HttpParams();
        params = params.set('id', id);
         return this.http.post(CONFIG.URL+"event/upload_photo_c",data,{ headers: headers,params:params, responseType: 'text' });
      }
   
      getphoto(id){
        const  token = localStorage.getItem('token');
        const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
        
         //let params = new HttpParams();
         //params = params.set('id', id);
         return this.http.get(CONFIG.URL+"event/get_photo_c/"+id,{ headers: headers, responseType: 'json' });
      }
   
  
  
      
      
  
  
      
  }