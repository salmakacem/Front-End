import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  token;
  currentMessage = new BehaviorSubject(null);


  constructor( private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging: AngularFireMessaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);

    }
    )
  }


  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (data) => {
  console.log(data);
  
        // this.token = data;
        // localStorage.setItem('webToken', this.token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );

  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
        this.showCustomNotification(payload);
      })

  }
showCustomNotification(payload:any){
  let notify_not=payload['notification'];

  let notify_data=payload['data']
  let title =notify_not['title'];
  let option={
    body:notify_not['body'],
    data: payload.data,
}

let notify:Notification =new Notification(title,option)

// notify.onclick=event=>{
//   event.preventDefault()
  
//   if (notify_data.dataTitle=="liste-pointage-rh") {
//     window.location.href="http://localhost:4200/dashboard/rh/verifpointage/"+notify_data.idChantier+"/"+notify_data.date;
//   } else
//    if (notify_data.dataTitle=="liste-pointage-conducteur") {
//     window.location.href="http://localhost:4200/dashboard/pointage/"+notify_data.idChantier;
//   } else
//   if (notify_data.dataTitle=="liste-pointage-chef-chantier") {
//    window.location.href="http://localhost:4200/dashboard/pointage/"+notify_data.idChantier;
//  }
 
// }
}
}
