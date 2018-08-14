import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

//modules
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material";

//component
import { AppComponent } from './app.component';
import { UserViewComponent } from './Users/user-view/user-view.component';
import { UserListComponent } from './Users/user-list/user-list.component';
import { NavbarComponent } from './NavBar/navbar/navbar.component';
import { LoginNavbarComponent } from './NavBar/login-navbar/login-navbar.component';

//services
import {AdminGuardService} from "../services/AdminGuardService/admin-guard.service";

const routes: Routes = [
  {path:'', redirectTo:'Home', pathMatch:'full'},
  // {path:'Home', component:MainComponent},
  // {path:'Shopping', component: CatalogComponent},
  {path:'Users', component: UserListComponent, canActivate: [AdminGuardService]},
  // {path:'Groups', component:GroupDiscussionComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserViewComponent,
    UserListComponent,
    NavbarComponent,
    LoginNavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
