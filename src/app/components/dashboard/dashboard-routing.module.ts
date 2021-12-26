import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ButtonsComponent } from './pages/buttons/buttons.component';
import { UsersComponent } from './pages/users/users.component';
import { EditorComponent } from './pages/editor/editor.component';
import { HomeComponent } from './pages/home/home.component';
import { IconsComponent } from './pages/icons/icons.component';
import { AdminGuard } from 'src/app/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent,  canActivate: [AuthGuard]},
      { path: 'icons', component: IconsComponent, canActivate: [AuthGuard] },
      { path: 'buttons', component: ButtonsComponent, canActivate: [AuthGuard] },
      { path: 'editor', component: EditorComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: '**', redirectTo: 'dashboard/home' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }