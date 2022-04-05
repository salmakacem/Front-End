import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidercodeService } from './validercode.service';
@Component({
  selector: 'app-validercode',
  templateUrl: './validercode.component.html',
  styleUrls: ['./validercode.component.scss']
})
export class ValidercodeComponent implements OnInit {
  codeverification: String;
  validercode: FormGroup;
  key:any;
  constructor(private route: ActivatedRoute, public router: Router, private formBuilder: FormBuilder, private validercodeService :ValidercodeService) { 
    this.validercode = this.formBuilder.group({


      codeverification: ["", [Validators.required]],
      
    
    },
    );
  }
  ngOnInit(): void {
    this.key = this.route.snapshot.queryParamMap.get('key');

  }
  updatemp(code) {

  
    
    console.log(code);
   

      this.validercodeService.Updatemp(code, this.key).subscribe((res) => {
        console.log(res);
        if (res['response']) {
          this.router.navigate(['/']);
         
        }
      },
        error => {
          alert(error);
        });
    }
   
  }


