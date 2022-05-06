import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Adress } from 'src/app/adress';
import { Details } from 'src/app/details';
import { Gestionadherents1Service } from './gestionadherent1.service';

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
      region :new FormControl ('',[Validators.required]),
      zip : new FormControl('',[Validators.required]),
      etats : new FormControl('',[Validators.required]),
    
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
        alert("adresse est supprimée");
        this.getAdressById(this.idUser);
      })
    );
  }
  

  

  deleteDetailById(id){
    this.gestionadherent1service.deleteDetail(id).subscribe(
      (res =>{
        alert("detail est supprimé");
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
        
        alert("detail est modifié");
        console.log("ddd")
        
       
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
        alert("adresse est modifié");
        console.log("aaaa")
      }
    )

  }

  
}
