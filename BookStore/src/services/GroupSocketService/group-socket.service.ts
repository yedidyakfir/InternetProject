import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class GroupSocketService extends Socket{

  constructor(private socket:Socket) {
    super({url:'http://localhost:3000', options:{}})
  }

  sendPost(msg:string) {
    this.socket.emit("post",msg);
  }
}
