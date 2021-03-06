import { AdressService } from './../../../adress.service';
import { Adress } from './../../../adress';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONFIG } from 'src/environments/environment';








@Component({
  selector: 'app-adresse',
  templateUrl: './adresse.component.html',
  styleUrls: ['./adresse.component.scss']
})
export class AdresseComponent implements OnInit {
  adressform:FormGroup;
  adress:Adress = new Adress();
  submitted:Boolean=false;

  constructor(private adressService:AdressService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
     this.adressform=  new FormGroup({
       
      city_name:new FormControl('', [Validators.required]),
      home_adress:new FormControl('', [Validators.required]),
      gouvernorat :new FormControl('', [Validators.required]),
      work_adress: new FormControl('', [Validators.required]),
      zip :new FormControl('', [Validators.required]),
      
    });
    

    
  }


 
  

 

  
  saveadress(){
    this.submitted=true;
if (this.adressform.invalid) {
  return ;
}
    console.log(this.adress);
    this.router.navigateByUrl('/login')
    this.adressService.saveadress(this.adress).subscribe(
      
      data=>{
        
      alert("register successfully!")
      
    },error=>alert("does not work"));
 
  

  }

}
