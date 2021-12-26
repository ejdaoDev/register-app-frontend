import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestGuard } from 'src/app/guards/guest.guard';
import { LoginComponent } from './pages/login/login.component';
//import { RegisterComponent } from './pages/register/register.component';
//import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

export const routes: Routes = [{
  path: '',
  children: [
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    //{ path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
    //{ path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [GuestGuard] }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }
