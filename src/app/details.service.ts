import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private _http: any;

  constructor(private httpClient:HttpClient) { }
  createAuthorizationHeader(headers: Headers) {
    var token = localStorage.getItem("token");
    headers.append("Authorization", "Bearer " + token);
  }
  
  saveD(details){
    const detail = JSON.parse(localStorage.getItem('currentUser'));

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const token = localStorage.getItem('token');
   // headers = headers.set('Authorization', 'Bearer ' +user.token);
    let us= JSON.stringify(details);
console.log(us)
    return this.httpClient.post(CONFIG.URL + "user-details/ajoutd",us,{ headers: headers, responseType: 'text' });
  }
  

  UploadImage(file:File){
 
    
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
   
   
    return this.httpClient.post(CONFIG.URL + "images/upload",formData,{ responseType: 'text' });
    }


  urlImg: string = CONFIG.URL + "images/files/{id}";
  getImg() {
    
    this.urlImg = CONFIG.URL + "images/files/{id}";
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http
      .get(this.urlImg, { headers: headers })
      .map(res => res.json())
      .catch(this.handleError);
  }
  handleError(handleError: any): any {
    throw new Error('Method not implemented.');
  }
}
