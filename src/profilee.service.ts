import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileeService {
  patchValue(response: any) {
    throw new Error('Method not implemented.');
  }

  baseUrl = '/api';

  constructor(private http: HttpClient) { }


  addProfile(profilee){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJ3ZW5AZGlwb3dlci5mciIsImV4cCI6MTY0NzM2MTY5MiwiaWF0IjoxNjQ3Mjc1MjkyfQ.gjfqt7qjbS7CdJ-h7jP6bIrTXc6ryNWwyNDbBsEL8sMMN6RKPkI04AmxyOzWlfXCYITObSpvzzq9Z-dOg4Te8A'
   });
    return this.http.post<any>(CONFIG.URL+'/users/save', profilee,{ headers: reqHeader });
  }

  getProfile(){
   const profile = this.http.get(this.baseUrl+'users/GetAll');
   return profile;
  }

  updateUser(profilee, id){

    return this.http.put(this.baseUrl+'users/{id}/update'+id,profilee).subscribe(
      (msg) => {
        console.log(msg),
        location.reload()
      },
      (error) => console.log(error)
    );

  }

  getProfileByID(id){
    const profile = this.http.get(this.baseUrl+'adress/find/{id}', id);
    return profile;
  }


  deleteProfile(id){
    return this.http.delete(this.baseUrl+'users/{id}/delete', id);
  }



  
}
