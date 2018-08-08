import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  userUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  register(email,password){
    this.http.post(this.userUrl + '/register',{email:email,password:password})
      .subscribe(res => console.log("s"));
    this.login(email,password);
  }

  login(email,password){
    this.http.post(this.userUrl + '/login',{email:email,password:password})
      .subscribe(res => console.log("s"));
  }

  isLogIn(){
    this.http.get(this.userUrl + '/isLogIn')
      .subscribe(res => console.log("s"));
  }
}
