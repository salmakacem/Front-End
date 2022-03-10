import { LoginService } from './LoginService';

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


  constructor(private router: Router, private LoginService:LoginService) { }

  ngOnInit(): void {
    this.loginform = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }
  onShowPassword() {
    this.showPassword = !this.showPassword;
  }

/*   onLogin() {
    if (this.loginform.status === "INVALID") {
      //this.ToastService.warning("le format e-mail/mot de passe n'est pas valide.");
      return;
    }

    this.loading = true;
    this.LoginService.login(this.loginform.value).subscribe(
      (data) => {
        this.ToastService.success("Connecté avec succès");
        this.router.navigate(["admin"]);
      },
      (error) => {
        this.loading = false;
        this.ToastService.error("s'il vous plaît vérifier vos informations d'identification");
      }
    );
  } */
  login()

  {
    console.log(this.loginform.value ,"test");

    this.LoginService.login(this.loginform.value).subscribe((data)=>{
      console.log(data)
    })
  }
}
  
 
 


