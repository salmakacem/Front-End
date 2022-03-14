

//import { Toast } from "./../../shared/services/toast.service";

import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[FormsModule]
})
export class LoginComponent implements OnInit {
  validForm: string;
  loginform: FormGroup;
  loading = false;
  showPassword = true;


  constructor() { }

  ngOnInit(): void {
    
  }
}