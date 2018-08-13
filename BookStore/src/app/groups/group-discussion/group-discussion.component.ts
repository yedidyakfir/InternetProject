import {Component, Input, OnInit} from '@angular/core';
import {Group} from "../../../model/group";

@Component({
  selector: 'app-group-discussion',
  templateUrl: './group-discussion.component.html',
  styleUrls: ['./group-discussion.component.css']
})
export class GroupDiscussionComponent implements OnInit {

  @Input()
  public group:Group;
  constructor() { }

  ngOnInit() {
  }

}
