
import { RegisterService } from './../../../register.service';
import { Users } from './../../../users';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'src/environments/environment';
import { decode } from 'punycode';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted=false;
  detail:any;
  registerForm:FormGroup;
  users:Users = new Users();


  constructor(private registerService: RegisterService , private router: Router, private sanitizer: DomSanitizer, private httpClient: HttpClient) { }
  username;
  selectedFile: File;
  thumbnail: any;
  thumbnailTest: any;
  message: any;
  email: String;
  ngOnInit(): void {

    this.registerForm = new FormGroup({ 
      
      
      firstName  :new FormControl('', [Validators.required]),
      lastName :new FormControl('', [Validators.required]),
      email  :new FormControl('', [Validators.required,Validators.email]),
      password  :new FormControl('', [Validators.required]),
      
    });
    

    
  }
  
  save(){
   
    this.submitted=true;
    if (this.registerForm.invalid) {
      return ;  
    }
   
    console.log(this.users);
    this.router.navigateByUrl('/details')
    this.registerService.Save(this.users).subscribe(
      
      data=>{
        
      alert("register successfully!")
      
    },error=>alert("does not work"));
 
  
  }
  Restlogin(email) {

    this.registerService.Restlogin(email)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigateByUrl('/validercode')     
        },
        error => {
          console.log(error);     
        });
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.registerService.UploadImage(this.selectedFile)
    .subscribe(
      (res) => {

        console.log(res);
      
       
      },
      error => {
        console.log(error);
        
      });

     
  }

  
  getProfileImg() {
    this.registerService.getImg().subscribe((imagetable) => {
      let retrievedImage = 'data:image/jpeg;base64,' + imagetable;
      this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(retrievedImage);
    }, error => {
      this.thumbnail = '';
      this.thumbnailTest = true
      console.log("error" + error);
    });
  }
}


  

  

  
  

