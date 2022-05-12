import { ForgotloginService } from './../forgotlogin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from './MustMatch';


@Component({
  selector: 'app-changermdp',
  templateUrl: './changermdp.component.html',
  styleUrls: ['./changermdp.component.scss']
})
export class ChangermdpComponent implements OnInit {
  email: any;
  changeForm: FormGroup;
  t = "";
  password: any;
  key:any;
  submitted=false;
  


  constructor(private route: ActivatedRoute, public router: Router, private formBuilder: FormBuilder, private forgotloginService: ForgotloginService) 
  {  
      this.changeForm = this.formBuilder.group({
      password: ["", [Validators.required,Validators.minLength(6)]],
      confirmpassword: ["", [Validators.required,Validators.minLength(6)]]
      
    },
    
        
 {
  Validators: MustMatch('password', 'confirmpassword')
} 
 );

  }

  ngOnInit(): void {
    this.key = this.route.snapshot.queryParamMap.get('key');
    
  }
 
  updatemp(pass, confmpass) {

  
    
    console.log(pass);
    console.log(confmpass);
    if (pass != confmpass) {
      alert("must match");
     

    }
      
    else {
      this.forgotloginService.Updatemp(pass, this.key).subscribe((res) => {
        console.log(res);
        if (res['response']) {
          this.router.navigate(['/login']);
         
        }
      },
        error => {
          alert(error);
        });
    }
   
  }

}
