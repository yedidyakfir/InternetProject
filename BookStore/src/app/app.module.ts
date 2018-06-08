import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { MatButtonModule } from "@angular/material";
import { MatFormFieldModule } from "@angular/material";
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { LoginNavBarComponent } from "./navbar/login-nav-bar/login-nav-bar.component";
import { LogedNavBarComponent } from './navbar/loged-nav-bar/loged-nav-bar.component';
import { NavBarComponent } from "./navbar/nav-bar/nav-bar.component";
import { LoginDialogComponent } from './navbar/login-dialog/login-dialog.component';


const routes: Routes = [
  {path: 'loginNav', component: LoginNavBarComponent},
  {path: 'logedNav/:manager', component: LogedNavBarComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginNavBarComponent,
    LogedNavBarComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    MatButtonModule,
    MatFormFieldModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
