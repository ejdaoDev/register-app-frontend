import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ButtonsComponent } from './pages/buttons/buttons.component';
import { UsersComponent } from './pages/users/users.component';
import { EditorComponent } from './pages/editor/editor.component';
import { HomeComponent } from './pages/home/home.component';
import { IconsComponent } from './pages/icons/icons.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent, data: { title: 'Dashboard | home' } , canActivate: [AuthGuard]},
      { path: 'icons', component: IconsComponent, data: { title: 'Dashboard | Icons' }, canActivate: [AuthGuard] },
      { path: 'buttons', component: ButtonsComponent, data: { title: 'Dashboard | Buttons' }, canActivate: [AuthGuard] },
      { path: 'editor', component: EditorComponent, data: { title: 'Dashboard | Editor' }, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, data: { title: 'Dashboard | Users' }, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'dashboard/home' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }