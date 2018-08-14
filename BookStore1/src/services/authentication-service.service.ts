import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";

@Injectable()
export class AuthenticationService {
  userUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  register(email,password): Observable<boolean> {
    let suc = false;
    this.http.post(this.userUrl + '/register',{email:email,password:password})
      .subscribe(res => {
        if(res == 'success')
          suc = true;
      });
    return this.login(email,password);
  }

  login(email,password):Observable<boolean>{
    return this.http.post<boolean>(this.userUrl + '/login',{email:email,password:password});
  }

  isLogIn(): Observable<boolean>{
    return this.http.get<boolean>(this.userUrl + '/isLogIn');
  }

  isAdministrator(): Observable<boolean>{
    return this.http.get<boolean>(this.userUrl + '/isAdmin');
  }

  logout(): Observable<boolean>{
    return this.http.get<boolean>(this.userUrl + '/logout');
  }
}
