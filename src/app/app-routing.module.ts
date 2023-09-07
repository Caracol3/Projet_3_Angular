import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { ContactComponent } from './contact/contact.component';
import { ChatComponent } from './chat/chat.component';
import { AccountComponent } from './account/account.component';
import { TrainInfoComponent } from './train-info/train-info.component';
import { SearchTrainComponent } from './search-train/search-train.component';
import { IsUserGuard } from './core/auth.guard';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'account', component: AccountComponent},
  { path: 'train-info', component: TrainInfoComponent},
  { path: 'search-train', component: SearchTrainComponent, canActivate: [IsUserGuard]},
  { path: 'admin/users', component: AdminComponent,canActivate: [IsUserGuard]}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
