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
import { PatientsRoutingModule } from './patients-routing.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientsCreateComponent } from './patients-create/patients-create.component';
import { PatientsUpdateComponent } from './patients-update/patients-update.component';
import { PatientsFormComponent } from './patients-form/patients-form.component';
import { PatientsShowComponent } from './patients-show/patients-show.component';
import { PatientsProfileComponent } from './patients-profile/patients-profile.component';
import { SharedModule } from '../shared/shared.module';
import { DiagnosisCreateComponent } from './diagnosis-create/diagnosis-create.component';
import { DiagnosisListComponent } from './diagnosis-list/diagnosis-list.component';
import { DiagnosisFormComponent } from './diagnosis-form/diagnosis-form.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
@NgModule({
  declarations: [
    PatientsListComponent,
    PatientsCreateComponent,
    PatientsUpdateComponent,
    PatientsFormComponent,
    PatientsShowComponent,
    PatientsProfileComponent,
    DiagnosisCreateComponent,
    DiagnosisListComponent,
    DiagnosisFormComponent
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
    PatientsRoutingModule,
    SharedModule,
    CKEditorModule,
    MatCardModule,
    MatListModule,
    MatChipsModule
  ]
})
export class PatientsModule {}
