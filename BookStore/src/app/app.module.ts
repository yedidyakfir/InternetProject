import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { MatButtonModule } from "@angular/material";
import { MatFormFieldModule } from "@angular/material";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LoginNavBarComponent } from './navbar/login-nav-bar/login-nav-bar.component';
import { LogedNavBarComponent } from './navbar/loged-nav-bar/loged-nav-bar.component';
import { NavBarComponent } from './navbar/nav-bar/nav-bar.component';
import { SmallBookViewComponent } from './shopping/small-book-view/small-book-view.component';
import { CatalogComponent } from './shopping/catalog/catalog.component';
import { GroupDiscussionComponent } from './groups/group-discussion/group-discussion.component';
import { EnterGroupComponent } from './groups/enter-group/enter-group.component';
import { BlogsComponent } from './groups/blogs/blogs.component';
import { MainImageComponent } from './main-image/main-image.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertService } from './services/alert-service.service';

const routes: Routes = [
  {path: 'loginNav', component: LoginNavBarComponent},
  {path: 'logedNav/:manager', component: LogedNavBarComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginNavBarComponent,
    LogedNavBarComponent,
    SmallBookViewComponent,
    CatalogComponent,
    GroupDiscussionComponent,
    EnterGroupComponent,
    BlogsComponent,
    MainImageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    MatButtonModule,
    MatFormFieldModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [
    NgbModal,
    AuthenticationService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
