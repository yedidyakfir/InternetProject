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
import { FileSelectDirective } from "ng2-file-upload";

import { LoginNavBarComponent } from "./navbar/login-nav-bar/login-nav-bar.component";
import { NavBarComponent } from './navbar/nav-bar/nav-bar.component';
import { SmallBookViewComponent } from './shopping/small-book-view/small-book-view.component';
import { CatalogComponent } from './shopping/catalog/catalog.component';
import { GroupDiscussionComponent } from './groups/group-discussion/group-discussion.component';
import { EnterGroupComponent } from './groups/enter-group/enter-group.component';
import { BlogsComponent } from './groups/blogs/blogs.component';
import { MainImageComponent } from './main-page/main-image/main-image.component';
import { AuthenticationService } from '../services/authentication-service.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../services/alert-service.service';
import { MainComponent } from './main-page/main/main.component';
import { UserViewComponent } from './users/user-view/user-view.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { SellBookComponent } from './shopping/sell-book/sell-book.component';
import { FooterComponent } from './main-page/footer/footer.component';
import { BigBookViewComponent } from './shopping/big-book-view/big-book-view.component';
import {AdminGuradService} from "../services/AdminGuradService/admin-gurad.service";

const routes: Routes = [
  {path:'', redirectTo:'Home', pathMatch:'full'},
  {path:'Home', component:MainComponent},
  {path:'Shopping', component: CatalogComponent},
  {path:'Users', component: UserListComponent, canActivate: [AdminGuradService]},
  {path:'Groups', component:GroupDiscussionComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginNavBarComponent,
    SmallBookViewComponent,
    CatalogComponent,
    GroupDiscussionComponent,
    EnterGroupComponent,
    BlogsComponent,
    MainImageComponent,
    MainComponent,
    UserViewComponent,
    UserListComponent,
    SellBookComponent,
    FileSelectDirective,
    FooterComponent,
    BigBookViewComponent
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
