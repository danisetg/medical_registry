import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { DoctorsCreateComponent } from './doctors-create/doctors-create.component';
import { DoctorsUpdateComponent } from './doctors-update/doctors-update.component';
import { DoctorsFormComponent } from './doctors-form/doctors-form.component';
import { DoctorsShowComponent } from './doctors-show/doctors-show.component';
import { DoctorsProfileComponent } from './doctors-profile/doctors-profile.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    DoctorsListComponent,
    DoctorsCreateComponent,
    DoctorsUpdateComponent,
    DoctorsFormComponent,
    DoctorsShowComponent,
    DoctorsProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MaterialFileInputModule,
    DoctorsRoutingModule,
    SharedModule
  ]
})
export class DoctorsModule {}
