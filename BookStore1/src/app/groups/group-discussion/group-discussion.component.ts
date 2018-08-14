import {Component, Input, OnInit} from '@angular/core';
import {Group} from "../../../model/group";
import {GroupSocketService} from "../../../services/GroupSocketService/group-socket.service";

@Component({
  selector: 'app-group-discussion',
  templateUrl: './group-discussion.component.html',
  styleUrls: ['./group-discussion.component.css']
})
export class GroupDiscussionComponent implements OnInit {
  @Input()
  public group:Group = new Group();
  public msgPost:string;

  constructor(private groupSocket:GroupSocketService) {
    this.getMessage();
  }

  ngOnInit() {
  }

  postMessage() {
    this.groupSocket.sendPost(this.msgPost);
  }

  getMessage() {
    this.groupSocket.getMessages()
      .subscribe(msg =>{
        this.group.messages.push(msg);
      })
  }
}
