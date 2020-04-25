import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from 'src/app/shared/models/patient.model';
import { isNullOrUndefined } from 'util';
import { PatientService } from 'src/app/shared/services/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { ScanQrComponent } from 'src/app/shared/dialogs/scan-qr/scan-qr.component';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-patients-form',
  templateUrl: './patients-form.component.html',
  styleUrls: ['./patients-form.component.sass']
})
export class PatientsFormComponent implements OnInit {
  hide = true;
  chide = true;
  @Input() patient: Patient;
  @Input() loading: boolean;
  @Output() submitPatient: EventEmitter<Patient> = new EventEmitter<Patient>();
  newImage = false;
  imageUrl: string;
  bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
  constructor(private patientservice: PatientService,
              public dialog: MatDialog,
              private messageService: MessageService
              ) { }

  ngOnInit(): void {
    if (isNullOrUndefined(this.patient)) {
      this.patient = this.patientservice.initialize();
      this.imageUrl = this.patient.imageUrl;
    }
  }
  onSubmit(patient: Patient) {
    patient.hashProfileImg = this.patient.hashProfileImg;
    patient.imageFile = this.patient.imageFile;
    this.submitPatient.emit(patient);
  }
  loadImage(file) {
    if (file && file[0]) {
      this.patient.imageFile = file[0];

      let reader = new FileReader();
      reader.readAsDataURL(file[0]);

      reader.onload = () => {

        this.imageUrl = reader.result as string;
        this.newImage = true;

      }
    }
  }
  cancelImage() {
    this.imageUrl = this.patient.imageUrl;
    this.newImage = false;
    this.patient.imageFile = null;
  }


  openScanDialog() {
    const dialogRef = this.dialog.open(ScanQrComponent, {
      height: '300px',
      width: '270px'
    });

    dialogRef.afterClosed().subscribe((result:string) => {
        if(result) {
            this.patient.address = result;
        }
    });
  }
}
