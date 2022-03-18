import { Component, Inject, OnInit } from '@angular/core';



import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ProfileeService } from 'src/profilee.service';


@Component({
  selector: 'app-profilee',
  templateUrl: './profilee.component.html',
  styleUrls: ['./profilee.component.scss']
})
export class ProfileeComponent implements OnInit {

  submited = false;
  profileForm: FormGroup;
 
 


  constructor(private route: Router, private profileservice: ProfileeService,
    
    ) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      nom : new FormControl('', [Validators.required]),
      prénom: new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required]),
     
     
    })
    
  }

  submitClient() {
    this.submited = true;
    if (this.profileForm.invalid) {
      return;
    }
  }

  


  



}

