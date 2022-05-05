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


  ajouterevent(event){
    console.log(event);
    
  const  token = localStorage.getItem('token');
  const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
   return this.http.post(CONFIG.URL+'event/save',event,{ headers: headers });
}

 
getEvent(): Observable<Event[]>{
        const  token = localStorage.getItem('token');
        const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
        return this.http.get<Event[]>(CONFIG.URL +'event/get',{ headers: headers });
  
}
  
      deleteEvent(event:Event) : Observable<Event[]>{
        const  token = localStorage.getItem('token');
        const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
       
       return this.http.delete<Event[]>(CONFIG.URL+'event/delete/'+event.id,{ headers: headers});
      }
   
      updateevent(event:Event) {
        const  token = localStorage.getItem('token');
        const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
        return this.http.put(CONFIG.URL+'event/updat/'+event.id,event,{ headers: headers,responseType: 'text' });

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