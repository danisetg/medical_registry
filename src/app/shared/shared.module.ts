import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanQrComponent } from './dialogs/scan-qr/scan-qr.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { DateTimePickerComponent } from './dialogs/date-time-picker/date-time-picker.component';
import { NgxMaskModule } from 'ngx-mask';
@NgModule({
  declarations: [ScanQrComponent, DateTimePickerComponent],
  imports: [CommonModule,
    ZXingScannerModule,
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
    NgxMaskModule
  ],
  entryComponents: [ScanQrComponent, DateTimePickerComponent]
})
export class SharedModule { }
