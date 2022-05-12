import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makeCapitalPopup(data: any): string { 
    return `` +
      `<div>Etat: ${ data.name }</div>` +
     
      `<div>Nb-Adhérent: ${ data.nb_adhérent}</div>`
  
  }
}
