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
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { ChatGlobalComponent } from './chat-global/chat-global.component';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

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
    SideBarComponent,
    MainChatComponent,
    PrivateChatComponent,
    ChatGlobalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    EmojiModule,
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
