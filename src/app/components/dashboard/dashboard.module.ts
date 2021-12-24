import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { AreaComponent } from './pages/home/widgets/area/area.component';
import { CardComponent } from './pages/home/widgets/card/card.component';
import { PieComponent } from './pages/home/widgets/pie/pie.component';

import { UsersComponent } from './pages/users/users.component';
import { UsersFormComponent } from './pages/users-form/users-form.component';
import { EditorComponent } from './pages/editor/editor.component';
import { IconsComponent } from './pages/icons/icons.component';
import { ButtonsComponent } from './pages/buttons/buttons.component';

import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    HomeComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    UsersComponent,
    UsersFormComponent,
    EditorComponent,
    IconsComponent,
    ButtonsComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
