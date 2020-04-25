import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsListComponent } from './doctors/doctors-list/doctors-list.component';
import { AuthGuardService } from './shared/auth-guard.service';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'doctors',
    loadChildren: () =>
      import('./doctors/doctors.module').then(m => m.DoctorsModule)
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./patients/patients.module').then(m => m.PatientsModule)
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        m => m.AuthenticationModule
      )
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
