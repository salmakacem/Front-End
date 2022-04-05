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
 
  
  listuser:Users[];
  formuser: FormGroup;
  user
  id
 
  

  constructor  ( private route:Router ,private gestionadherentsservice: GestionadherentsService ) { }

  ngOnInit(): void {
    



    this.formuser=new FormGroup({
      id : new FormControl('',[Validators.required]),
      firstName : new FormControl('',[Validators.required]),
      lastName : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required]),
     
      telephone:new FormControl ('',[Validators.required]),
      resetPasswordToken:new FormControl('',[Validators.required]),
     
      
   
    });
    
    this.getAllUser();
   
    this.listuser;
    
  
  
}



getAllUser(){
  this.gestionadherentsservice.getUser().subscribe(
    (responce)=>{
      this.listuser=responce;
      console.log(this.listuser);
    }
  );
}
deleteUserById(id){
  this.gestionadherentsservice.deleteUser(id).subscribe(
    (res =>{
      alert("adhérent est supprimé");
      this.getAllUser();
    })
  )
}

editUser(user){
  console.log("tttt",user);
  this.formuser.patchValue(user)
  

}

updateUserr(){
  console.log(this.formuser.value);
  
  this.gestionadherentsservice.updateUser(this.formuser.value).subscribe(
    (res) =>{
      
      alert("user est modifié");
      console.log("userr")
      
     
    }
   
  )
}




  


}

