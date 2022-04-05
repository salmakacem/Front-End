
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Adress } from 'src/app/adress';
import { Details } from 'src/app/details';
import { DetailsService } from 'src/app/details.service';
import { Users } from 'src/app/users';
import { ProfileadmineService } from './profileadmin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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
  
 
 



  constructor(private profileadminservice:ProfileadmineService, private detailsservice: DetailsService) { }

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
  
  this.profileadminservice.getUserByEmail(email).subscribe(
    
    (response)=>{
      this.user=response;
    console.log("userrr",this.user);
  
  this.getDetailsByIdUser( this.user.id);
    
  },error=>console.log(error));
} 


getDetailsByIdUser(id) {
  this.profileadminservice.getDetailsByIdUser(id).subscribe((response: any) => {
    this.details = response
    console.log("detaaa",this.details);
    this.getAdresseByIdUser( this.details.id);
    
  })
}




getAdresseByIdUser(id) {
  this.profileadminservice.getAdresseByIdUser(id).subscribe((response: any) => {
    this.adresse = response
    console.log("adreee",this.adresse);
    
  })
}


  }
