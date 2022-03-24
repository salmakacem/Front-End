import { RegisterService } from './../../../register.service';
import { Users } from './../../../users';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  users:Users = new Users();

  constructor(private registerService: RegisterService , private router: Router) { }

  ngOnInit(): void {
   
  
    
  }
  save(){
    console.log(this.users);
    this.router.navigateByUrl('/details')
    this.registerService.Save(this.users).subscribe(
      
      data=>{
        
      alert("register successfully!")
      
    },error=>alert("does not work"));
 
  
  }


  }
  

