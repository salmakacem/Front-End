import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Adress } from 'src/app/adress';
import { Details } from 'src/app/details';
import { Gestionadherents1Service } from './gestionadherent1.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionadherent1',
  templateUrl: './gestionadherent1.component.html',
  styleUrls: ['./gestionadherent1.component.scss']
})
export class Gestionadherent1Component implements OnInit {
  formadresse:FormGroup ;
  listadress : Adress;
  

  listdetail : Details;
  formdetail : FormGroup;
 
  idUser:any;

  edit: boolean = false;
  
  
  

  constructor( private route:Router, private gestionadherent1service : Gestionadherents1Service ,private router:ActivatedRoute) { }

  ngOnInit(): void {
this.router.params.subscribe(
()=>{
  this.idUser=this.router.snapshot.paramMap.get('id');
  
}
)
this.getDetailById(this.idUser);

    this.formadresse =new FormGroup ({
      id:new FormControl('',[Validators.required]),
      city_name:new FormControl ('',[Validators.required]),
      home_adress:new FormControl ('', [Validators.required]),
      work_adress : new FormControl ('',[Validators.required]),
      gouvernorat :new FormControl ('',[Validators.required]),
      zip : new FormControl('',[Validators.required]),
      
    
    });

   
    this.listadress;

    this.formdetail =new FormGroup ({
      id : new FormControl('',[Validators.required]),
      date_de_naissance:new FormControl ('',[Validators.required]),
      profession:new FormControl ('', [Validators.required]),
      sexe : new FormControl ('',[Validators.required]),
      statut_social :new FormControl ('',[Validators.required]),
      nationalite :new FormControl ('',[Validators.required]),

    });
    this.listdetail;
    



  }
  getAdressById(id){
    console.log('eee',id);
    
    this.gestionadherent1service.getAdresse(id).subscribe(
      (response:any)=>{
        this.listadress=response;
      console.log("adress",this.listadress);
    }
      );
      
  }

  getDetailById(id){
    
    
    this.gestionadherent1service.getDetails(id).subscribe(
      (response:any)=>{
        this.listdetail=response;
        this. getAdressById(response.id);
      console.log("detaail",this.listdetail);
    }

    );
  }

  deleteAdressById(id){
    this.gestionadherent1service.deleteAdress(id).subscribe(
      (res =>{
      
        this.getAdressById(this.idUser);
      })
    );
    
  }
  

  

  deleteDetailById(id){
    this.gestionadherent1service.deleteDetail(id).subscribe(
      (res =>{
     
        this.getDetailById(this.idUser);
      })
    );
  }

  

  editDetail(detail){
    console.log("ggg",detail);
    this.formdetail.patchValue(detail)
    

  }

  updateDetails(){
    console.log(this.formdetail.value);
    
    this.gestionadherent1service.updateDetail(this.formdetail.value).subscribe(
      (res) =>{
        
      this.successSwal();
        
       
      }
     
    )
  }

  editAdresse(adresse){
    console.log("hhh",adresse);
    this.formadresse.patchValue(adresse)

  }

  updateAdress(){
    console.log(this.formadresse.value);
    this.gestionadherent1service.updateAdresse(this.formadresse.value).subscribe(
      (res) => {
      
      }
    )

  }

  successSwal() {
    Swal.fire(
      'Adhérent modifié',
      '',
      'success'
    ).then(function () {
     window.location.reload();
    })

}
successSwal1() {
  Swal.fire(
    'Adresse modifiée',
    '',
    'success'
  ).then(function () {
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
      this.deleteDetailById(id);
      swalWithBootstrapButtons.fire(
        'Détail supprimé!',
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
confirmSwalAdress(id) {

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
      this.deleteAdressById(id);
      swalWithBootstrapButtons.fire(
        'Adresse supprimée!',
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
