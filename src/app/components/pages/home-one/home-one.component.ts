import { EventimageService } from './eventimage.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-one',
  templateUrl: './home-one.component.html',
  styleUrls: ['./home-one.component.scss']
})
export class HomeOneComponent implements OnInit {
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
  constructor(private sanitizer:DomSanitizer, private eventimage:EventimageService) { }

  ngOnInit(): void {
    
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
  
    
    this.eventimage.upload_photo(uploadImageData,id).subscribe(
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
    this.eventimage.getphoto(id).subscribe((imagetable:any) => {
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
}
