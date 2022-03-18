import { DetailsService } from './../../../details.service';
import { Details } from './../../../details';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  DetailsForm:FormGroup;
  details:Details = new Details();

  constructor(private detailsService: DetailsService , private router: Router) { }

  ngOnInit(): void {
    this.DetailsForm = new FormGroup({ 
      
      nationalite :new FormControl('', [Validators.required]),
      profession  :new FormControl('', [Validators.required]),
      cin  :new FormControl('', [Validators.required]),
      sexe  :new FormControl('', [Validators.required]),
      date_de_naissance  :new FormControl('', [Validators.required]),
      statut_social :new FormControl('', [Validators.required]),
      telephone  :new FormControl('', [Validators.required]),
    
      
    });
    
  }
  saveD(){
    console.log(this.details);
     this.router.navigateByUrl('/adresse')
    this.detailsService.saveD(this.details).subscribe(
      
      data=>{
        
      alert("register successfully!")
      
    },error=>alert("does not work"));
 
  }

}
