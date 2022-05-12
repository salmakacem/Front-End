import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';


import { ProfileadmineService } from '../dash/profile/profileadmin.service';

import { ProfileService } from '../profile.service';
import { ChatMessageDto } from './ChatMessageDto';


import { WebSocketService } from './websocket.service';





declare var Peer: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit , AfterViewInit, OnDestroy {
    
  @ViewChild('classicNotif') modalNotif: ElementRef;
  @ViewChild('classic2') modalAppel: ElementRef;
  @ViewChild('musicAppel') musicAppel: ElementRef;
  videoElement:any;
  myvideo:any;

  webSocketAPI: WebSocketService;
  name: string;
  nomIntervenant: any;
  userId: string;
  tokenUser: any;
  mesdemandes: any;
  clientid: string;
  client: any;
  intervenants: any;
  raison: string;
  send: string;
  lastMessage: any;
  idRecipient: any;
  userRole: any;
  discussion: any;
  connexion: any;
  who: any;
  search: String;
  last: any;
  closeResult: string;
  peer: any;
  ownVideo: any;
  anotherid;
  mypeerid: any;
  callerId: any;
  clientCaller: any;
  interCaller: any;
  beginCall:any;
  subscription: Subscription;
  browserRefresh = false;
  call: any;
  audio:any;
  openAp:any;
  apVideo:any;
  options:NgbModalOptions;
  imCalling:any;
  myStream:any;
  myStreamScreen:any;
  call0:any;
  retrieveResonse: any;
  base64Data: any;
  picprofile=  "assets/img/theme/images.png";
  role: string;
  clentpic: string;
  imgs: any;picuser: any;
  ngBModalRef:any;
  closedCall:any;
  chatsuser: any[] = new Array();
  save=false;
  inter: any[] = new Array();
  callerpic="assets/img/theme/images.png";
  reponse=false;
  currentPeer;
  apScreen:any;


  greetings: string[] = [];
 
  disabled = true;
  newmessage: string;

  private stompClient = null;

  constructor(public webSocketService: WebSocketService, private router: Router, private modalService: NgbModal , private profileservice : ProfileService , private profileAdminService : ProfileadmineService) {
    this.role = localStorage.getItem('role');
    this.nomIntervenant = localStorage.getItem('firstName');
    this.userId = localStorage.getItem('userId');
    
    this.clientid = localStorage.getItem('clientId');
    this.discussion = [];
    this.last = [];
    this.callerId = "";
    this.openAp=false;
    this.beginCall=false;  
    this.imCalling=true;
    this.apVideo=true;
    this.apScreen=true;
    this.closedCall=false;
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.browserRefresh = !router.navigated;
      }
    })
   }

   ngAfterViewInit(): void {   

    this.joinCall();
  }

  ngOnInit(): void {

    this.webSocketService.openWebSocket();
  
    this.peer = new Peer();
    this.peer.on('open', (id) => {
      this.mypeerid = id;
    })
    this.peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        if (data.includes('peerId') == true) {
          this.anotherid = data.substring(6, data.length);
          console.log(this.anotherid)
        }
        
        

    if (data.includes('closedCall') == true) {
      console.log("sa7bi 3alek")
      if (this.call==undefined){
      this.call0.close();
      }
      else{
        this.call.close();  
      }
      this.myStream.getTracks().forEach(track => track.stop()); 
      this.ngBModalRef.close();
    
    }
     });
    
   });
  

   
  }
  

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
   
  }
  sendMessage(sendForm: NgForm) {
    const chatMessageDto = new ChatMessageDto(sendForm.value.user, sendForm.value.message);
    this.webSocketService.sendMessage(chatMessageDto);
    sendForm.controls.message.reset();
  }
 
 afficherDisc(idSender, idRecipient,avecQui,index,pic) {

    
   
    this.who = avecQui;
    
    this.lastMessage = index;
    if (this.userId != null) {
      let message = {
        'senderId': this.userId,
        'recipientId': idRecipient,
        'content': "peerId " + this.mypeerid,
      }
      console.log(message);
     
    } else {
      let message = {
        'senderId': this.clientid,
        'recipientId': idRecipient,
        'content': "peerId " + this.mypeerid,
      }
      console.log(message);
    
    }

    this.picuser=pic;
    

  }

  verifConnected(x) {
    if (x == 'no') {

      return false
    } else {
      return true
    }
  }
  openModal(content, type, modalDimension) {
    if (modalDimension === 'xl' && type === 'modal_mini') {
      this.ngBModalRef=this.modalService.open(content, { windowClass: 'modal-mini', size: 'lg', centered: true })
      this.ngBModalRef.result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.ngBModalRef=this.modalService.open(content, { windowClass: 'modal-danger', centered: true })
      this.ngBModalRef.result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else {
      this.ngBModalRef=this.modalService.open(content, { centered: true })
      this.ngBModalRef.result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    }
    this.myvideo=document.getElementById('myVideo')
    this.videoElement=document.getElementById('videoElement')
   
    if(this.imCalling){
    this.openVideo();
    }
  }
  openVideo(){
    console.log("videos")
    this.imCalling=true;
    let video0 = this.videoElement;
    let video1 = this.myvideo;
    var localvar = this.peer;
    if (this.anotherid != null) {
      var fname = this.anotherid;
    }
    var n = <any>navigator;
    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
    if (fname != undefined) {
      n.getUserMedia({ video: { width: 3080, height: 2020 }, audio: true }, 
        (stream) => {
        this.myStream=stream;
        var call = localvar.call(fname, stream);
        this.currentPeer=call.peerConnection;
        console.log(this.currentPeer);
        this.call0=call;
        var conn = this.peer.connect(this.anotherid);
        if (this.userId != null) {
          conn.on('open', () => {
            conn.send("userId" + this.userId);
          });
        } else {
          conn.on('open', () => {
            conn.send("clientId" + this.clientid);
          });
        }
        video1.srcObject = stream;
        let y = video1.play();
        y.then(_ => {
          console.log("video mteei")
        }).catch(e => {
          console.log(e);
        })
        call.on('stream', (remotestream)=>{
          this.reponse=true;
          video0.srcObject = remotestream;
          let x = video0.play();
          x.then(_ => {
            console.log("video sa7bi")
          }).catch(e => {
            console.log(e);
          })
        })
      }, function (err) {
        console.log('Failed to get stream', err);
      })

    }
  }
  openReceive(content, type, modalDimension) {
    
    if (modalDimension === 'xl' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'lg', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else {
      this.modalService.open(content, { centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });

    }
  

  }
  

  joinCall() {
    this.peer.on('call', (call) => {
      this.call = call;
      console.log('onCall')
      
      console.log(this.currentPeer);
      this.openAp=true;
      this.openReceive(this.modalNotif, '', '');
      this.audio = new Audio();
      this.audio.src = "../../../assets/music/sonnerie-de-notification-dun-appel-messenger-facebook-messenger-sound-effect.mp4";
      this.audio.load();
      this.audio.play();
    })
  }
  streamsOut() {
   
    this.audio.pause();
    this.imCalling=false;
    this.openModal(this.modalAppel,'modal_mini','lg')
    console.log(this.ngBModalRef);      
    this.audio.currentTime = 0;
    console.log("winek")
    this.reponse=true;      
    if(this.openAp==true){
    let video0 = this.videoElement;
    let video1 = this.myvideo;
    var n = <any>navigator;
    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
    console.log("hazina");
    n.getUserMedia({ video: { width: 1280, height: 720 }, audio: true }, (stream) => {
      video1.srcObject = stream;
      this.myStream=stream;
      let y = video1.play();
      y.then(_ => {
        console.log("video mteei")
      }).catch(e => {
        console.log(e);
      })
      this.call.answer(stream);
      this.call.on('stream', (remotestream) => {
        this.currentPeer=this.call.peerConnection;
        console.log("answerd");
        console.log(remotestream);
        video0.srcObject = remotestream;
        let x = video0.play();
        x.then(_ => {
          console.log("video mtee lekher")
        }).catch(e => {
          console.log(e);
        })
      })
    }, function (err) {
      console.log('Failed to get stream', err);
    })

  }
  }

  streamsStop(){
    this.audio.pause();
    this.audio.currentTime = 0;
  }

 
  closeVideo(){
    this.myStream.getVideoTracks()[0].enabled=false;
    this.apVideo=false;
    this.apScreen=true;
    console.log(this.apVideo)
  }
  closeCall(){
    
    this.myStream.getTracks().forEach(track => track.stop()); 
    if(this.call0!=undefined){
    this.call0.close();
    }else{
      this.call.close();
    }
    var conn = this.peer.connect(this.anotherid);
    console.log(conn)
    conn.on('open', () => {
      conn.send("closedCall");
    });
  }

  private shareScreen(): void {
    // @ts-ignore
    navigator.mediaDevices.getDisplayMedia({
      video: {
        cursor: 'always'
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true
      }
    }).then(stream => {
      this.myStreamScreen=stream;
      this.apScreen=false;
      this.apVideo=false;
      let video1 = this.myvideo;
      const videoTrack = stream.getVideoTracks()[0];
      video1.srcObject = stream;
        let y = video1.play();
        y.then(_ => {
          
          console.log("video mteei")
        }).catch(e => {
          console.log(e);
        })
      videoTrack.onended = () => {
      };
      console.log(this.currentPeer);
      const sender = this.currentPeer.getSenders().find(s => s.track.kind === videoTrack.kind);
      sender.replaceTrack(videoTrack);
    }).catch(err => {
      console.log('Unable to get display media ' + err);
    });
    
  }
  

  private returnVideo(): void {
    this.apVideo=true;
    this.apScreen=true;
    // @ts-ignore
    navigator.getUserMedia({ video: { width: 3080, height: 2020 }, audio: true }, 
      (stream) => {
      this.myStream=stream;
      let video1 = this.myvideo;
      const videoTrack = stream.getVideoTracks()[0];
      video1.srcObject = stream;
        let y = video1.play();
        y.then(_ => {
          
          console.log("video mteei")
        }).catch(e => {
          console.log(e);
        })
      videoTrack.onended = () => {
      };
      console.log(this.currentPeer);
      const sender = this.currentPeer.getSenders().find(s => s.track.kind === videoTrack.kind);
      sender.replaceTrack(videoTrack);
    });
    
  }
  closeScreenShare(){
    this.myStreamScreen.getVideoTracks()[0].enabled=false;
    this.apScreen=true;
    this.apVideo=false;
  
  }

  

  


  

  

  

}
