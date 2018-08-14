import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs/index";
import {AuthenticationService} from "../authentication-service.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuradService implements CanActivate {

  constructor(private auth:AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.isAdministrator();
  }
}
