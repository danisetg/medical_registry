import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientsCreateComponent } from './patients-create/patients-create.component';
import { PatientsUpdateComponent } from './patients-update/patients-update.component';
import { PatientsShowComponent } from './patients-show/patients-show.component';
import { PatientsProfileComponent } from './patients-profile/patients-profile.component';
import { DiagnosisCreateComponent } from './diagnosis-create/diagnosis-create.component';
const routes: Routes = [
  {
    path: 'list',
    component: PatientsListComponent
  },
  {
    path: 'create',
    component: PatientsCreateComponent
  },
  {
    path: 'update',
    component: PatientsUpdateComponent
  },
  {
    path: 'profile',
    component: PatientsProfileComponent
  },
  {
    path: ':address/add-diagnosis',
    component: DiagnosisCreateComponent
  },
  {
    path: ':address',
    component: PatientsShowComponent
  },
  
 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule {}
