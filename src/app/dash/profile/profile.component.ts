
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Adress } from 'src/app/adress';
import { Details } from 'src/app/details';
import { DetailsService } from 'src/app/details.service';
import { Users } from 'src/app/users';
import { ProfileadmineService } from './profileadmin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  adresses
  formadresse: FormGroup
  formdetail : FormGroup
  form : FormGroup

  adress: Adress = new Adress();
  detail : Details = new Details();
  users: Users = new Users();
  detais
  userr
  email
  

  
  edit: boolean = false;
  submitted: boolean = false;
  update
  messageService: any;
  
 
 



  constructor(private profileadminservice:ProfileadmineService, private detailsservice: DetailsService) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.getUserByEmail(this.email);
    

    this.form = new FormGroup({
      id:new FormControl(''), 
      firstName:new FormControl('',[Validators.required]), 
      lastName:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      telephone: new FormControl ('', [Validators.required]),


    });
    this.formdetail = new FormGroup ({
      date_de_naissance:new FormControl('', [Validators.required]),
      profession:new FormControl('', [Validators.required]),
      sexe : new FormControl ('',[Validators.required]),
      nationalite :new FormControl ('',[Validators.required]),
      
      statut_social: new FormControl('', [Validators.required]),
    });
    

    this.formadresse =new FormGroup ({
      city_name:new FormControl ('',[Validators.required]),
      home_adress:new FormControl ('', [Validators.required]),
      work_adress : new FormControl ('',[Validators.required]),
      region :new FormControl ('',[Validators.required]),

    });
    
  
    
    }

    
getUserByEmail(email){
  
  this.profileadminservice.getUserByEmail(email).subscribe(
    
    (response)=>{
      this.userr=response;
    console.log("userrr",this.userr);
  
  this.getDetailByIdUser( this.userr.id);
    
  },error=>console.log(error));
} 


getDetailByIdUser(id) {
  this.profileadminservice.getDetailByIdUser(id).subscribe((response: any) => {
    this.detais = response
    console.log("detaaa",this.detais);
    this.getAdressByIdUser( this.detais.id);
    
  })
}




getAdressByIdUser(id) {
  this.profileadminservice.getAdressByIdUser(id).subscribe((response: any) => {
    this.adresses = response
    console.log("adreee",this.adresses);
    
  })
}

updateUser() {
  this.edit = true;
  this.form.patchValue(this.userr)
 
}

AnnulerUpdateUser() {
  this.edit = false;

}
saveUpdateUser() {
console.log("ooooo",this.form.value);

  this.profileadminservice.updateUser(this.form.value).subscribe(
    (msg) => {
      console.log(msg)
    },
    (error) => {
      console.log(error)
      this.messageService.add({ severity: 'error ', summary: 'Erreur', detail: 'Profile Non modifié', life: 3000 })
    },
    () => {
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Profile Modifié', life: 3000 });
      this.edit = false;
      this.ngOnInit();
    }
  );

 
}



  }
