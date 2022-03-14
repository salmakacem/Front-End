<<<<<<< HEAD


//import { Toast } from "./../../shared/services/toast.service";

import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
=======
>>>>>>> d3326b095d2001d55dafb69f5e3fbeaa03b694ae

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from './../../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
<<<<<<< HEAD
  validForm: string;
  loginform: FormGroup;
  loading = false;
  showPassword = true;


  constructor() { }

  ngOnInit(): void {
    
  }
=======
  loginForm;
  submitted:Boolean=false;
  constructor(private AuthServiceService: AuthServiceService , private route: Router) { }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
  })
}
submitForm() {

this.submitted=true;
if (this.loginForm.invalid) {
  console.log(this.loginForm.value ,"test");
  return ;
}
 this.AuthServiceService.login(this.loginForm.value)
 this.route.navigateByUrl('/')
}
>>>>>>> d3326b095d2001d55dafb69f5e3fbeaa03b694ae
}