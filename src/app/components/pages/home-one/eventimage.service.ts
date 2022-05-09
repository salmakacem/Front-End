import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventimageService {

  constructor(private http:HttpClient) { }
  
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
