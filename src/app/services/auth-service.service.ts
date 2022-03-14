import { HttpClient,HttpResponse , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  baseUrl="/api";
 


  constructor(private  httpClient: HttpClient, private route: Router) { }

  isLoginSubject = new BehaviorSubject<boolean>(this.isAuthentificated())

  addUser(user){
    // const  token = localStorage.getItem('token');
    // const  headers  = new HttpHeaders().set("Authorization", 'Bearer ' + token);
    // this.httpClient.post<any>(this.baseUrl+'users/addUser',user,{ headers: headers }).subscribe(
      this.httpClient.post<any>(this.baseUrl+'users/addUser',user ).subscribe(
    (msg) => {
        console.log(msg),
        location.reload()
      },
      (error) => console.log(error)
    );
  }
  getUser(){
    const user= this.httpClient.get(this.baseUrl+'users/allUsers');
    return user;
  }
  
  login(log){
  // this.httpClient.post(this.baseUrl+'/logins/login',log) .subscribe((response:any) => {
  //   if (response.token) {
      console.log("ok");
      
      localStorage.setItem('token',"response.token" );
      localStorage.setItem('role',"response.user" );
      this.isLoginSubject.next(true);
     
  //   }
  //   (error) => console.log(error.message)
      
  //  })

      
  }
  
  public isAuthentificated(): boolean {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('role');
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
}
