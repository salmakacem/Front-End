
import { ForgotloginService } from './../forgotlogin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-forgotlogin',
  templateUrl: './forgotlogin.component.html',
  styleUrls: ['./forgotlogin.component.scss']
})
export class ForgotloginComponent implements OnInit {
  email: String;
  forgotloginform: FormGroup;

  constructor(public router: Router, private formBuilder: FormBuilder, private forgotloginService: ForgotloginService) { 
   
  }

  ngOnInit(): void {
    this.forgotloginform = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }

  Restlogin(email) {

    this.forgotloginService.Restlogin(email)
      .subscribe(
        (res) => {

          console.log(res);
          this.router.navigateByUrl('/login')
         
        },
        error => {
          console.log(error);
          
        });


  }


}
