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
import { HttpClientModule } from '@angular/common/http';
import { SearchTrainComponent } from './search-train/search-train.component'; // <-- Import HttpClientModule
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './config/jwtInterceptor';
import { AdminComponent } from './admin/admin.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

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
    SearchTrainComponent,
    AdminComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
       useClass: JwtInterceptor,
        multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
