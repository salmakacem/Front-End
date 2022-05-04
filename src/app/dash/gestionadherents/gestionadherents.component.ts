import { HttpErrorResponse } from '@angular/common/http';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router,  } from '@angular/router';
import { Adress } from 'src/app/adress';
import { Details } from 'src/app/details';
import { Users } from 'src/app/users';
import Swal from 'sweetalert2';


import { GestionadherentsService } from './gestionadherents.service';

@Component({
  selector: 'app-gestionadherents',
  templateUrl: './gestionadherents.component.html',
  styleUrls: ['./gestionadherents.component.scss']
})
export class GestionadherentsComponent implements OnInit {
  title = 'Angular Search Using ng2-search-filter';
  searchText;
  heroes = [
    { id: 4, firstName: 'marwen', lastName: 'sghaier',email:'marwen@dipower.fr',telephone:'234444' },
    { id: 3, firstName: 'SELMA', lastName: 'aaa',email:'aaaa',telephone:'aaaa' },
    { id: 44, firstName: 'RRRRR', lastName: 'RRRRRRRR',email:'RRRRRRRR',telephone:'RRRRRRR' },
   

  ];
  
  listuser:Users[];
  formuser: FormGroup;
  user
  id
  edit: boolean = false;
  

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
  let resp = this.gestionadherentsservice.deleteUser(id);
    
     // alert("adhérent est supprimé");
      this.getAllUser();
}

editUser(user){
  console.log("tttt",user);
  this.formuser.patchValue(user)
  

}

updateUserr(){
  console.log(this.formuser.value);
  
  this.gestionadherentsservice.updateUser(this.formuser.value).subscribe(
    (msg) => {
      console.log(msg)
    },
    (error) => {
      console.log(error)
    
    },
    () => {
     
      this.edit = false;
      this.ngOnInit();
    }
  );
}



successSwal(){
  Swal.fire({
    icon: 'success',
    title: 'Votre profile est modifié avec succés',
    text: ''
  }).then(function () {
    window.location.reload();
  })
} 

confirmSwal(id) {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Vous êtes sûre ?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Non, annulée',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.deleteUserById(id);
      swalWithBootstrapButtons.fire(
        'Fiche supprimée!',
        '',
        'success'
      )

    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Action annulée',
        '',
        'error'
      )
    }
  })
}

}

