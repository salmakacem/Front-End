import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Adress } from 'src/app/adress';
import Swal from 'sweetalert2';
import { GestioneventService } from './gestionevent.service';
import { Event } from 'src/app/event';

@Component({
  selector: 'app-gestionevent',
  templateUrl: './gestionevent.component.html',
  styleUrls: ['./gestionevent.component.scss']
})
export class GestioneventComponent implements OnInit {
  title = 'Angular Search Using ng2-search-filter';
  searchText;
  heroes = [
    // { id: 5, date: '1651051628000', nomevent: 'test',descriptionEvent:'test',statut:'true',adressevent:'tunis' },
    // { id: 16, date: '1543276800000' , nomevent: 'tt',descriptionEvent:'tt',statut:'false',adressevent:'tt'},
    // { id: 12, date: '1543276800000' , nomevent: 'ff',descriptionEvent:'ff',statut:'true',adressevent:'ff'},
    // { id: 12, date: '1543276800000' , nomevent: 'aaa',descriptionEvent:'ff',statut:'true',adressevent:'ff'},

  ];

  ajoutevent: FormGroup;
  form: FormGroup;


  formI: FormGroup;

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
  thumbnailTest:boolean=true ;
  idSelected
  event
  listevent: Event[];
  id
  submitted: boolean;
  edit: boolean = false;
  constructor( private route:Router ,private gestioneventservice: GestioneventService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {

 
    this.form =new FormGroup ({
    
      id:new FormControl('',[Validators.required]),
      date:new FormControl ('',[Validators.required]),
      nom_event:new FormControl ('',[Validators.required]),
      descriptionEvent:new FormControl ('',[Validators.required]),
      duree:new FormControl ('',[Validators.required]),
      // debut:new FormControl ('',[Validators.required]),
      // fin:new FormControl ('',[Validators.required]),
      adressevent:new FormControl ('',[Validators.required]),
      
    });
    
    this.listevent;
   

    this.getAllEvent();
 
  }

  

  getAllEvent(){
    this.gestioneventservice.getEvent().subscribe(
      (response)=>{
        
        
        this.listevent=response;
        console.log(this.listevent);
      }
    );
  }



  deleteEventById(id){
   let resp= this.gestioneventservice.deleteEvent(id);
      resp.subscribe((data) => this.event= data);
        
      this.getAllEvent();
  }
  
  
  successSwal(){
    Swal.fire({
      icon: 'success',
      title: 'Affiche ajoutée',
      text: ''
    }).then(function () {
        window.location.reload();
      })
  }
  successSwal1(){
    Swal.fire({
      icon: 'success',
      title: 'évènement modifié avec succées',
      text: ''
    }).then(function () {
      window.location.reload();
    })
  }
  successSwal2(){
    Swal.fire({
      icon: 'error',
      title: 'modification annulée',
      text: ''
    }).then(function () {
      this.form.reset();
    })
  }

 
    
  closeEvent(){
    this.form.reset();
  }
  

  editevent(event){
    console.log("ggg",event);
    this.form.patchValue(event)
    

  }

  updateEvents(){
    console.log(this.form.value);
    
    this.gestioneventservice.updateevent(this.form.value).subscribe(
      (res) =>{
        
        
        console.log("ddd")
        
       
      }
     
    )
  }

  add_event() {

     this.gestioneventservice.ajouterevent(this.form.value).subscribe((data:any) =>
      {
        this.onUploadc(data.id) 
        this.successSwa1l();
      })
}

successSwa1l() {
      Swal.fire(
        'Cet évènement est ajouté!',
        '',
        'success'
      ).then(function () {
       window.location.reload();
      })

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

onUploadc(id){ 
  console.log(this.selectedFile);
  const uploadImageData = new FormData();

  uploadImageData.set('file', this.selectedFile, this.selectedFile.name);
  console.warn(uploadImageData);
console.log(this.idSelected);

  
  this.gestioneventservice.upload_photo(uploadImageData,id).subscribe(
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
    console.log( );
    if (imagetable.picByte ==null) {
      this.thumbnailTest = false;
      this.idSelected=id;
    }else{
      this.thumbnailTest = true;
    
    }
    const retrievedImage = 'data:image/jpeg;base64,' + imagetable.picByte ;
    this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(retrievedImage);
   
  }, error => {
     this.thumbnail = '';
    
 });

 
}
confirmSwal(id) {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Vous êtes sûre ?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Non, annulée',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.deleteEventById(id);
      swalWithBootstrapButtons.fire(
        'Fiche supprimée!',
        '',
        'success'
      )

    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Action annulée',
        '',
        'error'
      )
    }
  })
}
}
