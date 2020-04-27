import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { DoctorsCreateComponent } from './doctors-create/doctors-create.component';
import { DoctorsUpdateComponent } from './doctors-update/doctors-update.component';
import { DoctorsShowComponent } from './doctors-show/doctors-show.component';
import { DoctorsProfileComponent } from './doctors-profile/doctors-profile.component';
const routes: Routes = [
  {
    path: 'list',
    component: DoctorsListComponent
  },
  {
    path: 'create',
    component: DoctorsCreateComponent
  },
  {
    path: 'update',
    component: DoctorsUpdateComponent
  },
  {
    path: 'profile',
    component: DoctorsProfileComponent
  },
  {
    path: ':address',
    component: DoctorsShowComponent
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule {}
