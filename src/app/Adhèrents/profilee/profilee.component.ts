import { Component, Inject, OnInit } from '@angular/core';



import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Adress } from 'src/app/adress';
import { AdressService } from 'src/app/adress.service';
import { Details } from 'src/app/details';

import { Users } from 'src/app/users';


@Component({
  selector: 'app-profilee',
  templateUrl: './profilee.component.html',
  styleUrls: ['./profilee.component.scss']
})
export class ProfileeComponent implements OnInit {

  formadresse: FormGroup
  formdetail : FormGroup
  form : FormGroup

  adress: Adress = new Adress();
  detail : Details = new Details();
  users: Users = new Users();
  
 
 


  constructor(private route:Router, private adresseservice: AdressService,
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName:new FormControl('',[Validators.required]), 
      lastName:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),


    });

    this.formdetail = new FormGroup ({
      date_de_naissance:new FormControl('', [Validators.required]),
      profession:new FormControl('', [Validators.required]),
      telephone: new FormControl ('', [Validators.required]),
      statut_social: new FormControl('', [Validators.required]),
    });

    this.formdetail =new FormGroup ({
      city_name:new FormControl ('',[Validators.required]),
      home_adress:new FormControl ('', [Validators.required]),
      work_adress : new FormControl ('',[Validators.required]),
      region :new FormControl ('',[Validators.required]),

    });
    
    }

getadresse(){
 
    console.log(this.adress);
    this.route.navigateByUrl('/details')
    this.adresseservice.getadresse(this.adress).subscribe(
      
      data=>{
        
      alert("register successfully!")
      
    },error=>alert("does not work"));
 
}




getdetail(){}





getuser(){}
  


  



}

