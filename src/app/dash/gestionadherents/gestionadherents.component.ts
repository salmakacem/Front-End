import { HttpErrorResponse } from '@angular/common/http';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router,  } from '@angular/router';
import { Adress } from 'src/app/adress';
import { Details } from 'src/app/details';
import { Users } from 'src/app/users';


import { GestionadherentsService } from './gestionadherents.service';

@Component({
  selector: 'app-gestionadherents',
  templateUrl: './gestionadherents.component.html',
  styleUrls: ['./gestionadherents.component.scss']
})
export class GestionadherentsComponent implements OnInit {
  formadresse: FormGroup;
  
  listadress : Adress[];
  
  listuser:Users[];
  formuser: FormGroup;
 
  

  constructor  ( private route:Router ,private gestionadherentsservice: GestionadherentsService ) { }

  ngOnInit(): void {
    this.formadresse =new FormGroup ({
      city_name:new FormControl ('',[Validators.required]),
      home_adress:new FormControl ('', [Validators.required]),
      work_adress : new FormControl ('',[Validators.required]),
      region :new FormControl ('',[Validators.required]),

    });

    this.getall();
    this.listadress;


    
      



  
   


    this.formuser=new FormGroup({
      id : new FormControl('',[Validators.required]),
      firstName : new FormControl('',[Validators.required]),
      lastName : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required]),
     
      telephone:new FormControl ('',[Validators.required]),
     
      
   
    });
    
    this.getAllUser();
   
    this.listuser;
    
  
  
}
getall(){
  this.gestionadherentsservice.getAdresse().subscribe(
    (response)=>{
      this.listadress=response;
    console.log("adress",this.listadress);
  }
    );
    
}


getAllUser(){
  this.gestionadherentsservice.getUser().subscribe(
    (responce)=>{
      this.listuser=responce;
      console.log(this.listuser);
    }
  );
}



  


}

