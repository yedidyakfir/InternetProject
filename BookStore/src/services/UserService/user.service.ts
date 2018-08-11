import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = 'http://localhost:3000/users';

  constructor(private http:HttpClient) { }

  getBookList(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/list');
  }
}
