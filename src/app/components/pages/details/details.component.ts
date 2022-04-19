import { DetailsService } from './../../../details.service';
import { Details } from './../../../details';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(private detailsService: DetailsService , private router: Router,private sanitizer: DomSanitizer) { }
  username;
  selectedFile: File;
  thumbnail: any;
  thumbnailTest: any;
  message: any;
  email: String;
  imageName:any;
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

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.detailsService.UploadImage(this.selectedFile)
    .subscribe(
      (res) => {

        console.log(res);
      
       
      },
      error => {
        console.log(error);
        
      });

     
  }
  getProfileImg() {
    
    this.detailsService.getImg().subscribe((imagetable) => {
      let retrievedImage = 'data:image/jpeg;base64,' + imagetable;
      this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(retrievedImage);
    }, error => {
      this.thumbnail = '';
      this.thumbnailTest = true
      console.log("error" + error);
    });
  }
  
  // getImage() {
    
  //   this.detailsService.getImage().subscribe((imagetable) => {
  //     let retrievedImage = 'data:image/jpeg;base64,' + imagetable;
  //     this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(retrievedImage);
  //   }, error => {
  //     this.thumbnail = '';
  //     this.thumbnailTest = true
  //     console.log("error" + error);
  //   });
  // }

}
