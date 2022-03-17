import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CONFIG } from 'src/environments/environment';






@Component({
  selector: 'app-adresse',
  templateUrl: './adresse.component.html',
  styleUrls: ['./adresse.component.scss']
})
export class AdresseComponent implements OnInit {
  form!:FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
     this.form= this.formBuilder.group({
      FirstName:'',
      LastName:'',
      Email:'',
      password:'',
      
    });
    
  }

  submit(){
    this.http.post(CONFIG.URL, this.form.getRawValue()).subscribe(() =>{
      this.router.navigate(['/']);
    })
  }
}
