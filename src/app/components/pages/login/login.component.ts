
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
}