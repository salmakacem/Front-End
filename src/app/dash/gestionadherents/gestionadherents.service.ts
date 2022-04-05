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


   

   
    getUser() : Observable<Users[]> {
      const  token = localStorage.getItem('token');
      const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
      return this.http.get<Users[]>(CONFIG.URL +'users/GetAllU/',{ headers: headers });

    }

    deleteUser(user:Users) : Observable<Users[]>{
      const  token = localStorage.getItem('token');
      const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
      return this.http.delete<Users[]>(CONFIG.URL+'users/del/'+user.id,{ headers: headers });
    }
      

      updateUser(users:Users) {
        const  token = localStorage.getItem('token');
        const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
        return this.http.put(CONFIG.URL+'users/update/'+users.id,users,{ headers: headers });

      }
    

   


    
    



  }