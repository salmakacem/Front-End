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
  imgURL:any;
  userFile;
 submitted:false;

  constructor(private detailsService: DetailsService , private router: Router) { }
 
  ngOnInit(): void {
    this.DetailsForm = new FormGroup({ 
      
      nationalite :new FormControl('', [Validators.required]),
      profession  :new FormControl('', [Validators.required]),
      sexe  :new FormControl('', [Validators.required]),
      date_de_naissance  :new FormControl('', [Validators.required]),
      statut_social :new FormControl('', [Validators.required]),
     
    
      
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
  // onSelectFile(event){
  //   if(event.target.files.length > 0)
  //   {
  //     const file =event.target.files[0];
  //     this.userFile =file;
  //     this.f['profile'].setValue(file);
  //     var mimeType=event.target.files[0].type;
  //     if(mimeType.match(/image\/*/)==null){
  //       this.message="only images supported";
  //       return;
  //     }
  //     var reader = new FileReader();
  //     this.imagePath=file;
  //     reader.readAsDataURL(file);
  //     reader.onload= (_event)=>{
  //       this.imgURL = reader.result;
  //     }
  //   }
  // }

}
