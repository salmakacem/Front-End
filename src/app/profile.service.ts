import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONFIG } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class ProfileService {

 

  
  
  
  constructor(private http: HttpClient ) { }
  createAuthorizationHeader(headers: Headers) {
    var token = localStorage.getItem("token");
    headers.append("Authorization", "Bearer " + token);
  }
  change_password(log) {
    console.log(log);
    
    const token = localStorage.getItem('token');
    let email = localStorage.getItem('email');
    const headers = new HttpHeaders().set("Authorization", 'Bearer ' + token);
    let params = new HttpParams();
       params = params.append('email',email);
    params = params.append('currentPassword', log.passwordAct);
    params = params.append('newPassword', log.passwordNew);
   
   console.log(email,log);
   
   return this.http.post(CONFIG.URL+"users/clients/resetPassword",log, { headers: headers,params:params, responseType: 'text' });
  }
    


  getUserByEmail(email){
    const  token = localStorage.getItem('token');
    const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
    const user= this.http.get(CONFIG.URL +'users/find/'+email,{ headers: headers });
    return user;
    
  }

  getAdresseByIdUser(id){
    const  token = localStorage.getItem('token');
    const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
    const adress= this.http.get(CONFIG.URL +'adress/find/'+id,{ headers: headers });
    return adress;
  }




  getDetailsByIdUser(id){
    const  token = localStorage.getItem('token');
    const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
    const details= this.http.get(CONFIG.URL +'user-details/fin/'+id,{ headers: headers });
    return details;
  }


  updateUser(users){

    // const users = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new HttpHeaders();
    headers = headers.set('Csontent-Type', 'application/json; charset=utf-8');

    const token = localStorage.getItem('token');
    headers = headers.set("Authorization", 'Bearer ' + token);
    
    return this.http.put(CONFIG.URL + 'users/update/'+users.id,users,{ headers: headers, responseType: 'text' });
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
