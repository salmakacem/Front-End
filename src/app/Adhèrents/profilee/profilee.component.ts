import { Component, Inject, OnInit } from '@angular/core';



import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Adress } from 'src/app/adress';
import { AdressService } from 'src/app/adress.service';

import { Details } from 'src/app/details';
import { DetailsService } from 'src/app/details.service';
import { ProfileService } from 'src/app/profile.service';

import { Users } from 'src/app/users';


@Component({
  selector: 'app-profilee',
  templateUrl: './profilee.component.html',
  styleUrls: ['./profilee.component.scss']
})
export class ProfileeComponent implements OnInit {
adresse
  formadresse: FormGroup
  formdetail : FormGroup
  form : FormGroup

  adress: Adress = new Adress();
  detail : Details = new Details();
  users: Users = new Users();
  details
  user
  email
  
 
 


  constructor(private route:Router, private profileservice: ProfileService, private adressservice: AdressService,
    private detailsservice: DetailsService
    ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.getUserByEmail(this.email);
    

    this.form = new FormGroup({
      firstName:new FormControl('',[Validators.required]), 
      lastName:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      telephone: new FormControl ('', [Validators.required]),


    })
    this.formdetail = new FormGroup ({
      date_de_naissance:new FormControl('', [Validators.required]),
      profession:new FormControl('', [Validators.required]),
      
      statut_social: new FormControl('', [Validators.required]),
    })
    

    this.formadresse =new FormGroup ({
      city_name:new FormControl ('',[Validators.required]),
      home_adress:new FormControl ('', [Validators.required]),
      work_adress : new FormControl ('',[Validators.required]),
      region :new FormControl ('',[Validators.required]),

    })
  
    
    }

    
getUserByEmail(email){
  
  this.profileservice.getUserByEmail(email).subscribe(
    
    (response)=>{
      this.user=response;
    console.log("userrr",this.user);
  
  this.getDetailsByIdUser( this.user.id);
    
  },error=>console.log(error));
} 


getDetailsByIdUser(id) {
  this.profileservice.getDetailsByIdUser(id).subscribe((response: any) => {
    this.details = response
    console.log("detaaa",this.details);
    this.getAdresseByIdUser( this.details.id);
    
  })
}




getAdresseByIdUser(id) {
  this.profileservice.getAdresseByIdUser(id).subscribe((response: any) => {
    this.adresse = response
    console.log("adreee",this.adresse);
    
  })
}




}
  


  





