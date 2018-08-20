import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {BehaviorSubject, Observable, Subject} from "rxjs/index";
import {Blog} from "../../model/blog";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogUrl = "http://localhost:3000/blog";
  private socket = io('http://localhost:3000');
  private blogs: BehaviorSubject<Blog[]> = new BehaviorSubject<Blog[]>([]);
  private chosenBlog: BehaviorSubject<Blog>;

  constructor(private http: HttpClient) {
    this.chosenBlog = new BehaviorSubject<Blog>(new Blog());
    this.getList();
    this.getBlogLikes();
    this.getBlogUnlikes();
  }

  joinRoom(blog:Blog) {
    this.socket.emit('join', {room:blog.name});
  }

  getList() :Observable<Blog[]> {
    this.http.get<Blog[]>(this.blogUrl + '/list')
      .subscribe(res => this.blogs.next(res));
    return this.blogs;
  }

  addToBlogList(blog: Blog) {
    let newList = this.blogs.getValue();
    newList.push(blog);
    console.log(newList);
    this.blogs.next(newList);
  }

  getBlogByName(name: string):Observable<Blog> {
    return this.http.post<Blog>(this.blogUrl + '/data', {room:name});
  }

  sendPost(msg:string,room:string) {
    console.log(msg);
    this.socket.emit("post",{msg:msg,room:room});
  }

  getMessages(): Observable<{msg:string,user:string}> {
    return new Observable<{msg:string,user:string}>(observer =>{
      this.socket.on('post', (data) => {
        observer.next(data);
      });
    });
  }

  doILike(blog:Blog) :Observable<boolean> {
    return this.http.post<boolean>(this.blogUrl + '/doILike',{room:blog.name});
  }

  likePost(blog:Blog) {
    console.log('like');
    this.socket.emit('like',{room:blog.name});
  }

  unlikePost(blog:Blog) {
    this.socket.emit('unlike',{room:blog.name});
  }

  getBlogLikes() {
    this.socket.on('like', (data) => {
      let newBlog = this.chosenBlog.getValue();
      newBlog.likes.push(data.user);
      this.chosenBlog.next(newBlog);
      console.log(newBlog);
    });
  }

  getBlogUnlikes() {
    this.socket.on('unlike', (data) => {
      let newBlog = this.chosenBlog.getValue();
      let i = newBlog.likes.indexOf(data.user);
          if(i != -1)
            newBlog.likes.splice(i,1);
      this.chosenBlog.next(newBlog);
      console.log(newBlog);
    });
  }

  addUser(user:string,blog:Blog) {
    this.http.post(this.blogUrl + '/addUser', {user:user, room:blog.name})
      .subscribe(success => {
        if(success) {
          let newBlog = this.chosenBlog.getValue();
          let index = newBlog.joinRequest.indexOf(user);
          if(index != -1) {newBlog.joinRequest.splice(index,1);}
          this.chosenBlog.next(newBlog);
        }
        else {alert("cant add this user");}
      });
  }

  isCreator(blog:Blog): Observable<boolean> {
    return this.http.post<boolean>(this.blogUrl + '/isCreator' ,{room:blog.name});
  }

  sendJoinReq(blog: Blog): Observable<boolean> {
    return this.http.post<boolean>(this.blogUrl + '/sendJoinReq' , {room:blog.name});
  }

  chooseBlog(blog:Blog) {
    console.log(blog);
    this.chosenBlog.next(blog);
  }

  getChosenBlog(): Subject<Blog> {
    return this.chosenBlog;
  }
}
