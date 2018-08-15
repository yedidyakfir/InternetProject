import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user";
import {Observable} from "rxjs/index";
import {register} from "ts-node";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = 'http://localhost:3000/users';

  constructor(private http:HttpClient) { }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/list');
  }

  deleteUser(email:string): Observable<boolean> {
    console.log("delete user have called");
    return this.http.post<boolean>(this.userUrl + '/disable', {email:email});
  }

  updateUser(email:string,newEmail:string,newPassword:string):Observable<boolean> {
    return this.http.post<boolean>(this.userUrl + '/update',{email:email, newUser:{email:newEmail,password:newPassword}});
  }

  register(email:string, password:string)
  {
    return this.http.post<boolean>(this.userUrl + '/register',{email:email,password:password});
  }


}

