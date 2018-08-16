import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private socket = io('http://localhost:3000');

  constructor() {console.log("strat socket")}

  sendPost(msg:string) {
    console.log(msg);
    this.socket.emit("post",msg);
  }

  getMessages(): Observable<string> {
    return new Observable<string>(observer =>{
      this.socket.on('post', (data) => {
        observer.next(data);
      });
    });
  }
}
