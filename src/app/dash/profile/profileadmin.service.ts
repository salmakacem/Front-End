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
    const user= this.http.get(CONFIG.URL +'users/find/'+email,{ headers: headers });
    return user;
    
  }

  getDetailsByIdUser(id){
    const  token = localStorage.getItem('token');
    const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
    const details= this.http.get(CONFIG.URL +'user-details/fin/'+id,{ headers: headers });
    return details;
  }

  getAdresseByIdUser(id){
    const  token = localStorage.getItem('token');
    const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
    const adress= this.http.get(CONFIG.URL +'adress/find/'+id,{ headers: headers });
    return adress;
  }
}