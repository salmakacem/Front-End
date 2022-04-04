import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Adress } from 'src/app/adress';
import { Details } from 'src/app/details';
import { GestionadherentsService } from '../gestionadherents/gestionadherents.service';
import { Gestionadherents1Service } from './gestionadherent1.service';

@Component({
  selector: 'app-gestionadherent1',
  templateUrl: './gestionadherent1.component.html',
  styleUrls: ['./gestionadherent1.component.scss']
})
export class Gestionadherent1Component implements OnInit {
  formadresse:FormGroup ;
  listadress : Adress[];
  

  listdetail : Details[];
  formdetail : FormGroup;
 
  id;

  edit: boolean = false;
  
  

  constructor( private route:Router, private gestionadherent1service : Gestionadherents1Service ) { }

  ngOnInit(): void {
    this.formadresse =new FormGroup ({
      id:new FormControl('',[Validators.required]),
      city_name:new FormControl ('',[Validators.required]),
      home_adress:new FormControl ('', [Validators.required]),
      work_adress : new FormControl ('',[Validators.required]),
      region :new FormControl ('',[Validators.required]),
      zip : new FormControl('',[Validators.required]),
      etats : new FormControl('',[Validators.required]),
    
    });

    this.getall();
    this.listadress;

    this.formdetail =new FormGroup ({
      id : new FormControl('',[Validators.required]),
      date_de_naissance:new FormControl ('',[Validators.required]),
      profession:new FormControl ('', [Validators.required]),
      sexe : new FormControl ('',[Validators.required]),
      statut_social :new FormControl ('',[Validators.required]),
      cin :new FormControl ('',[Validators.required]),
      nationalite :new FormControl ('',[Validators.required]),

    });
    this.listdetail;
    this.getalldetail();



  }
  getall(){
    this.gestionadherent1service.getAdresse().subscribe(
      (response)=>{
        this.listadress=response;
      console.log("adress",this.listadress);
    }
      );
      
  }

  getalldetail(){
    this.gestionadherent1service.getDetails().subscribe(
      (response)=>{
        this.listdetail=response;
      console.log("detaail",this.listdetail);
    }

    );
  }

  deleteAdressById(id){
    this.gestionadherent1service.deleteAdress(id).subscribe(
      (res =>{
        alert("adresse est supprimée");
        this.getall();
      })
    );
  }

  deleteDetailById(id){
    this.gestionadherent1service.deleteDetail(id).subscribe(
      (res =>{
        alert("detail est supprimé");
        this.getalldetail();
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
