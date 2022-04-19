import { CONFIG } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, NgModule } from '@angular/core';



import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Adress } from 'src/app/adress';
import { AdressService } from 'src/app/adress.service';

import { Details } from 'src/app/details';
import { DetailsService } from 'src/app/details.service';
import { ProfileService } from 'src/app/profile.service';

import { Users } from 'src/app/users';
import { decode } from 'punycode';
import Swal from 'sweetalert2';
import { MustMatch } from 'src/app/components/pages/changermdp/MustMatch';
import { Token } from '@angular/compiler';





@Component({
  selector: 'app-profilee',
  templateUrl: './profilee.component.html',
  styleUrls: ['./profilee.component.scss']
})
export class ProfileeComponent implements OnInit {
   
  adresse
  formadresse: FormGroup
  formdetail : FormGroup
  form : FormGroup
  resetPasswordForm: FormGroup;
  adress: Adress = new Adress();
  detail : Details = new Details();
  users: Users = new Users();
  details
  user
  email
  edit: boolean = false;
  submitted: boolean = false;
  messageService: any;
  id: any;
  userFile: any;
  namefile="Importer une photo";
  imageSrc: string | ArrayBuffer;
  selectedFile: any;
  retrieveResonse: any;
  base64Data: any;
  retrievedImage=  "assets/img/theme/images.png";
  idUser:any;
  image: any;
  selected: boolean=false;
  thumbnail: any ;
  thumbnailTest: any;
  urlImg: any;
  role: any;

  type_input: boolean;
  type_input3: boolean;
  type_input2: any;
  
  constructor(private route:Router, private profileservice: ProfileService, private adressservice: AdressService,
    private detailsservice: DetailsService,private httpClient:HttpClient,private sanitizer:DomSanitizer,private formBuilder:FormBuilder
    ) { }
    
   
    
      
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
    this.resetPasswordForm = this.formBuilder.group({

      passwordAct: ['', Validators.required],
      passwordNew: ['', Validators.required],
      passwordConf: ['', Validators.required]

    }, {
      validator: MustMatch('passwordNew', 'passwordConf')
    });
  }
  get f() { return this.resetPasswordForm.controls; }
  passwordReset() {
    
{
      let resp = this.profileservice.resetPassword( Token,this.user.id, this.resetPasswordForm.get('passwordAct').value, this.resetPasswordForm.get('passwordNew').value);
      resp.subscribe(data => {
        if (data == true) {
          Swal.fire({
            icon: 'success',
            title: 'Votre mot de passe est modifié avec succés',
            text: ''
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Votre mot de passe actuel est incorrecte',

          })

        }
      }

      );
    }
{
      let resp = this.profileservice.resetPassword(Token, this.user.id, this.resetPasswordForm.get('passwordAct').value, this.resetPasswordForm.get('passwordNew').value);
      resp.subscribe(data => {
        if (data == true) {
         
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'Votre mot de passe est modifié avec succés'
          }).then((result)=>{
            window.location.reload();
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Votre mot de passe actuel est incorrecte',

          })

        }
      }

      );
    }
    }
 
     successSwal(){
       Swal.fire({
         icon: 'success',
         title: 'Votre profile est modifié avec succés',
         text: ''
       })
     }
     changeInput1() {
      this.type_input = !this.type_input;
    }
    changeInput2() {
      this.type_input2 = !this.type_input2;
    }
    changeInput3() {
      this.type_input3 = !this.type_input3;
    }
getUserByEmail(email){
  
  this.profileservice.getUserByEmail(email).subscribe(
    
    (response)=>{
      this.user=response;
   
    this.getProfileImg(this.user.id)
  this.getDetailsByIdUser( this.user.id);
    
  },error=>console.log(error));
} 


getDetailsByIdUser(id) {
  this.profileservice.getDetailsByIdUser(id).subscribe((response: any) => {
    this.details = response
    this.getAdresseByIdUser( this.details.id);
    
  })
}




getAdresseByIdUser(id) {
  this.profileservice.getAdresseByIdUser(id).subscribe((response: any) => {
    this.adresse = response

    
  })
}


updateUser() {
  this.edit = true;
  this.form.patchValue(this.user)
 
}

AnnulerUpdateUser() {
  this.edit = false;

}
sauvgarderUpdateUser(){
  this.profileservice.updateUser(this.form.value).subscribe(
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





onSelectFile(event) {
  const file = event.target.files[0];
  this.userFile= file;
  this.namefile=this.userFile.name;
  console.log(this.userFile);
  const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
      this.selectedFile= event.target.files[0];
      this.selected=true
}

onUploadc(){ 
  console.log(this.selectedFile);
  const uploadImageData = new FormData();

  uploadImageData.set('file', this.selectedFile, this.selectedFile.name);
  console.warn(uploadImageData);
  this.profileservice.upload_photo(uploadImageData,this.user.id).subscribe(
    () => {
  
    },
   (erreur)=>{
    console.log(erreur);
     
   } ,
   ()=>{
    document.getElementById("closeModalButton").click();
    this.imageSrc=null;
    this.selected=false;
     this.ngOnInit();
   
   }) ;
}
getProfileImg(id) {
  this.profileservice.getphoto(id).subscribe((imagetable:any) => {
    const retrievedImage = 'data:image/jpeg;base64,' + imagetable.picByte ;
    this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(retrievedImage);
  }, error => {
     this.thumbnail = '';
    this.thumbnailTest = true;
 });
}


}