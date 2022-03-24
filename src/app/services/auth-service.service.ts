import { Users } from './../users';



import { Role } from './../components/model/role';
import { HttpClient,HttpResponse , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CONFIG } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../components/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 // users:Users[]=[{"firstName":"marwen","lastName":"sghaier","email":"marwen@dipower.fr","password":"12345","roles":['ADMIN']},
  //               {"firstName":"selma","lastName":"kacem","email":"selma@dipower.fr","password":"salma","roles":['ADHERENT']}];

  public roles:string[];
  CONFIG: string;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
 


  constructor(private  httpClient: HttpClient, private route: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser")) );
    this.currentUser = this.currentUserSubject.asObservable();

   }
   public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  isLoginSubject = new BehaviorSubject<boolean>(this.isAuthentificated())

  addUser(user){
     const  token = localStorage.getItem('token');
     const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
     this.httpClient.post<any>(CONFIG.URL+'users/addUser',user,{ headers: headers }).subscribe(

    (msg) => {
        console.log(msg),
        location.reload()
      },
      (error) => console.log(error)
    );
  }
  getUser(){
    const user= this.httpClient.get(this.CONFIG+'users/allUsers');
    return user;
  }
  
  login(log){
  this.httpClient.post<any>(`${CONFIG.URL}auth/login`,log) .subscribe((response:any) => {
  
     if (response.token) {
     
      console.log(response);
      localStorage.setItem('email', log.email);
      localStorage.setItem('token',response.token );
      localStorage.setItem('role',response.ROLE[0].name);
      //localStorage.setItem('role', JSON.stringify(Role));

      // let data = JSON.parse(localStorage.getItem('roles'));

      // console.log(Role);

        
    }
   
   (error) => console.log(error.message)
      
    })

      
  }
  
  public isAuthentificated(): boolean {
    const token = localStorage.getItem('token');
    const User = localStorage.getItem('roles');
    if (token == null) {
      return false;
    } else {
      return true;
    }
  }
 
  public UserAuthentificated(): boolean {
   
    const user = localStorage.getItem('role');
    if (user ==="admin") {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    console.log("ok");
    
    localStorage.removeItem('token');
    localStorage.removeItem('authentificated_user');
    this.isLoginSubject.next(false);
    this.route.navigateByUrl('/admin')
    
  }


   resetpassword(email) {
    return this.httpClient.get(`${CONFIG.URL}contact/réinitialisationPassword?email=${email}`)
  } 
}
