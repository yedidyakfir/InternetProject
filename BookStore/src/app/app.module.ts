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
import { FileSelectDirective } from "ng2-file-upload";
import {NgxPayPalModule} from "ngx-paypal";
import {BsDropdownModule} from "ngx-bootstrap";

//component
import { AppComponent } from './app.component';
import { UserViewComponent } from './Users/user-view/user-view.component';
import { UserListComponent } from './Users/user-list/user-list.component';
import { NavbarComponent } from './NavBar/navbar/navbar.component';
import { LoginNavbarComponent } from './NavBar/login-navbar/login-navbar.component';
import { RegisterComponent } from './NavBar/register/register.component';
import { FooterComponent } from './Main-Page/footer/footer.component';
import { MainComponent } from './Main-Page/main/main.component';
import { CatalogComponent } from './Shopping/catalog/catalog.component';
import { SmallBookViewComponent } from './Shopping/small-book-view/small-book-view.component';
import { BigBookViewComponent } from './Shopping/big-book-view/big-book-view.component';
import { SellBookComponent } from './Shopping/sell-book/sell-book.component';
import { CartComponent } from './Shopping/cart/cart.component';
import { PaypalComponent } from './Shopping/paypal/paypal.component';
import { BlogListComponent } from './Blogs/blog-list/blog-list.component';
import { BlogDiscussionComponent } from './Blogs/blog-discussion/blog-discussion.component';
import { BlogViewComponent } from './Blogs/blog-view/blog-view.component';
import { BlogPostComponent } from './Blogs/blog-post/blog-post.component';
import { MyBooksComponent } from './Shopping/my-books/my-books.component';
import { MainBlogViewComponent } from './Blogs/main-blog-view/main-blog-view.component';

//services
import {AdminGuardService} from "../services/AdminGuardService/admin-guard.service";
import { SearchFilterPipe } from './search-filter.pipe';

const routes: Routes = [
  {path:'', redirectTo:'Home', pathMatch:'full'},
  {path:'Home', component:MainComponent},
  {path:'Shopping', component: CatalogComponent},
  {path:'Users', component: UserListComponent, canActivate: [AdminGuardService]},
  {path: 'Register', component: RegisterComponent},
  {path: 'Cart', component: CartComponent},
  {path:'Groups', component: MainBlogViewComponent, children: [
      {path:'',redirectTo:'List', pathMatch:'full'},
      {path:'List' , component:BlogListComponent},
      {path: 'BlogDiscussion/:name', component: BlogDiscussionComponent}
    ]},
  {path: 'MyBooks',component: MyBooksComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserViewComponent,
    UserListComponent,
    NavbarComponent,
    LoginNavbarComponent,
    RegisterComponent,
    FooterComponent,
    MainComponent,
    CatalogComponent,
    SmallBookViewComponent,
    BigBookViewComponent,
    SellBookComponent,
    FileSelectDirective,
    CartComponent,
    PaypalComponent,
    BlogListComponent,
    BlogDiscussionComponent,
    BlogViewComponent,
    BlogPostComponent,
    MyBooksComponent,
    MainBlogViewComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    BsDropdownModule.forRoot(),
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgxPayPalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
