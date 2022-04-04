import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class ProfileadmineService {
  
  constructor(private http: HttpClient) { }

  getUserByEmail(email){
    const  token = localStorage.getItem('token');
    const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
    const use= this.http.get(CONFIG.URL +'users/find/'+email,{ headers: headers });
    return use;
    
  }

  getDetailByIdUser(id){
    const  token = localStorage.getItem('token');
    const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
    const detai= this.http.get(CONFIG.URL +'user-details/fin/'+id,{ headers: headers });
    return detai;
  }

  getAdressByIdUser(id){
    const  token = localStorage.getItem('token');
    const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
    const adres= this.http.get(CONFIG.URL +'adress/find/'+id,{ headers: headers });
    return adres;
  }

  updateUser(users){

    // const users = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    const token = localStorage.getItem('token');
    headers = headers.set("Authorization", 'Bearer ' + token);
    
    return this.http.put(CONFIG.URL + 'users/update/'+users.id,users,{ headers: headers, responseType: 'text' });
    }



  
  

  
}