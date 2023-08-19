import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { TrainInfoComponent } from './train-info/train-info.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { AccountComponent } from './account/account.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http'; // <-- Import HttpClientModule

FormsModule

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    TrainInfoComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    AccountComponent,
    ContactComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
