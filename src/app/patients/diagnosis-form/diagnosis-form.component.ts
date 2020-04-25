import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Diagnosis } from 'src/app/shared/models/diagnosis.model';
import { isNullOrUndefined } from 'util';
import { PatientService } from 'src/app/shared/services/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { ScanQrComponent } from 'src/app/shared/dialogs/scan-qr/scan-qr.component';
import { MessageService } from 'src/app/shared/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-diagnosis-form',
  templateUrl: './diagnosis-form.component.html',
  styleUrls: ['./diagnosis-form.component.sass']
})
export class DiagnosisFormComponent implements OnInit {
  hide = true;
  chide = true;
  @Input() diagnosis: Diagnosis;
  @Input() loading: boolean;
  @Output() submitDiagnosis: EventEmitter<Diagnosis> = new EventEmitter<Diagnosis>();
  newImage = false;
  imageUrl: string;
  bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
  public Editor = ClassicEditor;
  constructor(private patientService: PatientService,
              public dialog: MatDialog,
              private messageService: MessageService
              ) { }

  ngOnInit(): void {
    if (isNullOrUndefined(this.diagnosis)) {
      this.diagnosis = new Diagnosis();
      this.diagnosis.files = [];
      this.diagnosis.hashFile = [];
    }
  }
  onSubmit(diagnosis: Diagnosis) {
    diagnosis.hashFile = this.diagnosis.hashFile;
    diagnosis.files = this.diagnosis.files;
    this.submitDiagnosis.emit(diagnosis);
  }
  loadFile(files) {

    console.log(files);
    if (files && files[0]) {
      for(let key in files) {
        if (!isNaN(parseInt(key))) {
          this.diagnosis.files.push(files[key]);
        this.diagnosis.hashFile.push({
          name: files[key].name,
          hash: ""
        });
        }
      }
    }
  }
  cancelFile(i) {
    this.diagnosis.files.splice(i, 1);
    this.diagnosis.hashFile.splice(i, 1);
  }
}
