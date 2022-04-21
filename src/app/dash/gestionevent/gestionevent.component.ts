import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Adress } from 'src/app/adress';
import Swal from 'sweetalert2';
import { GestioneventService } from './gestionevent.service';

@Component({
  selector: 'app-gestionevent',
  templateUrl: './gestionevent.component.html',
  styleUrls: ['./gestionevent.component.scss']
})
export class GestioneventComponent implements OnInit {

  formadresse: FormGroup;
  
  listadress : Adress[];
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
  event

  constructor( private route:Router ,private gestioneventservice: GestioneventService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {

    this.formadresse =new FormGroup ({
      id:new FormControl('',[Validators.required]),
      city_name:new FormControl ('',[Validators.required]),
      home_adress:new FormControl ('', [Validators.required]),
      work_adress : new FormControl ('',[Validators.required]),
      region :new FormControl ('',[Validators.required]),
      etats : new FormControl('',[Validators.required]),

    });
    this.listadress;
    this.getall();
  }

  successSwal(){
    Swal.fire({
      icon: 'success',
      title: 'Votre profile est modifié avec succés',
      text: ''
    })
  }
  getall(){
    this.gestioneventservice.getAdress().subscribe(
      (response)=>{
        this.listadress=response;
      console.log("userrr",this.listadress);
    }
      );
      
  }

  deleteAdress(){
    
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
    this.gestioneventservice.upload_photo(uploadImageData,this.event.id).subscribe(
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
    this.gestioneventservice.getphoto(id).subscribe((imagetable:any) => {
      const retrievedImage = 'data:image/jpeg;base64,' + imagetable.picByte ;
      this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(retrievedImage);
    }, error => {
       this.thumbnail = '';
      this.thumbnailTest = true;
   });
  }
}
