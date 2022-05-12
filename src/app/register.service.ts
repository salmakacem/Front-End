
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONFIG } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private _http: any;

  constructor(private httpClient:HttpClient) { }
  createAuthorizationHeader(headers: Headers) {
    var token = localStorage.getItem("token");
    headers.append("Authorization", "Bearer " + token);
  }
  
  Save(users){
    const user = JSON.parse(localStorage.getItem('currentUser'));

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const token = localStorage.getItem('token');
  //headers = headers.set('Authorization', 'Bearer ' +token);
    let us= JSON.stringify(users);

    return this.httpClient.post(CONFIG.URL + "users/ajout",users,{ headers: headers, responseType: 'text' });
  }
  Restlogin(email: any): Observable<any[]> {
 
    console.log(email);
    let params = new HttpParams();
    params = params.append('email', email);
    let url = CONFIG.URL + 'auth/reset-code'+'?email'+email;
    console.log(url);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    //let urltosend="http://localhost:4200" ;
    return this.httpClient.post(url, JSON.stringify({
     }|| null)
      , { params: params,headers: headers, responseType: 'text' })
      .pipe(map((response: any) =>response));
      
       ;
  }
  UploadImage(file:File){
 
    
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
   
   
    return this.httpClient.post(CONFIG.URL + "images/upload",formData,{ responseType: 'text' });
    }


  urlImg: string = CONFIG.URL + "api/images/upload";
  getImg() {
    this.urlImg = CONFIG.URL + "api/images/upload";
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
