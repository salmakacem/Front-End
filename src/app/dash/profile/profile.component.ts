import { AuthServiceService } from './../../services/auth-service.service';
import { ProfileService } from 'src/app/profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CONFIG } from './../../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Adress } from 'src/app/adress';
import { Details } from 'src/app/details';
import { DetailsService } from 'src/app/details.service';
import { Users } from 'src/app/users';
import { ProfileadmineService } from './profileadmin.service';
import Swal from 'sweetalert2';
import { MustMatch } from 'src/app/components/pages/changermdp/MustMatch';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  adresses
  formadresse: FormGroup;
  resetPasswordForm:FormGroup;
   formdetail : FormGroup;
   form : FormGroup;
 
   adress: Adress = new Adress();
   detail : Details = new Details();
   users: Users = new Users();
   detais
   userr
   email
  
   type_input: boolean;
   type_input3: boolean;
   type_input2: any;
   
   
   edit: boolean = false;
   submitted: boolean = false;
   update
 
 
 
   id: any;
   userFile: any;
   namefile="Importer une photo";
   imageSrc: string | ArrayBuffer;
   selectedFile: any;
   retrieveResonse: any;
   base64Data: any;
   retrievedImage=  "assets/img/theme/images.png";
 
   image: any;
   selected: boolean=false;
   thumbnail: any ;
   thumbnailTest: any;
   
  
 
 

  constructor(private profileadminservice:ProfileadmineService,private profileService:ProfileService, private detailsservice: DetailsService, private httpClient:HttpClient, private sanitizer: DomSanitizer, private authService:AuthServiceService,private formBuilder:FormBuilder) { }

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
    
    

    successSwal(){
      Swal.fire({
        icon: 'success',
        title: 'Votre profile est modifi?? avec succ??s',
        text: ''
      })
    }  

getUserByEmail(email){
  
  this.profileadminservice.getUserByEmail(email).subscribe(
    
    (response)=>{
      this.userr=response;
   
    this.getProfileImg(this.userr.id)
  this.getDetailByIdUser( this.userr.id);
    
  },error=>console.log(error));
} 

getDetailByIdUser(id) {
  this.profileadminservice.getDetailByIdUser(id).subscribe((response: any) => {
    this.detais = response
    this.getAdressByIdUser( this.detais.id);
    
  })
}




getAdressByIdUser(id) {
  this.profileadminservice.getAdressByIdUser(id).subscribe((response: any) => {
    this.adresses = response
    
    
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
    
    },
    () => {
     
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

  uploadImageData.set('file', this.selectedFile ,this.selectedFile.name);
  console.warn(uploadImageData);
  this.profileadminservice.upload_photo(uploadImageData,this.userr.id).subscribe(
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
  this.profileadminservice.getphoto(id).subscribe((imagetable:any) => {
    const retrievedImage = 'data:image/jpeg;base64,' + imagetable.picByte ;
    this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(retrievedImage);
  }, error => {
     this.thumbnail = '';
    this.thumbnailTest = true;
 });
}
submitForm() {
  this.submitted=true;
  if (this.resetPasswordForm.invalid) {
    return;
  }
this.profileadminservice.change_password(this.resetPasswordForm.value).subscribe(
  (msg) => {
    console.log(msg)
  },
  (error) => {
    console.log(error)
  },
  () => { 
   this.authService. logout();
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
  successSwal1(){
    Swal.fire({
      icon: 'success',
      title: 'Votre mot de passeS est modifi?? avec succ??s',
      text: ''
    })
  }


  

    }
