import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Adress } from 'src/app/adress';
import { GestioneventService } from './gestionevent.service';

@Component({
  selector: 'app-gestionevent',
  templateUrl: './gestionevent.component.html',
  styleUrls: ['./gestionevent.component.scss']
})
export class GestioneventComponent implements OnInit {

  formadresse: FormGroup;
  
  listadress : Adress[];

  constructor( private route:Router ,private gestioneventservice: GestioneventService) { }

  ngOnInit(): void {

    this.formadresse =new FormGroup ({
      city_name:new FormControl ('',[Validators.required]),
      home_adress:new FormControl ('', [Validators.required]),
      work_adress : new FormControl ('',[Validators.required]),
      region :new FormControl ('',[Validators.required]),

    });
    this.listadress;
    this.getall();
  }

  getall(){
    this.gestioneventservice.getAdress().subscribe(
      (response)=>{
        this.listadress=response;
      console.log("userrr",this.listadress);
    }
      );
      
  }

  deleteAdress(){
    
  }

}
