import { Component, Inject, OnInit } from '@angular/core';



import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/register.service';


@Component({
  selector: 'app-profilee',
  templateUrl: './profilee.component.html',
  styleUrls: ['./profilee.component.scss']
})
export class ProfileeComponent implements OnInit {

  submited = false;
  profileForm: FormGroup;
 
 


  constructor(private route:Router, 
    
    ) { }

  ngOnInit(): void {
    
     
    
    
  }


  


  



}

