
import { ChatComponent } from './chat.component';

export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    stompClient: any;
    component: ChatComponent;
    constructor(x: ChatComponent){
        this.component = x;
    }
    _connect() {
        console.log("Initialize WebSocket Connection");
        //let ws = new SockJS(this.webSocketEndPoint);
       // this.stompClient = Stomp.over(ws);
        const _this = this;
        return(_this.stompClient)
    };
    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }
    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => { 
        }, 5000);
    }
	/**
	 * Send message to sever via web socket
	 * @param {*} message 
	 */
    _send(message) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }
    onMessageReceived(message) {
       // this.component.handleMessage(JSON.stringify(message.body));
    }
}