import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { isNullOrUndefined } from 'util';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { ScanQrComponent } from 'src/app/shared/dialogs/scan-qr/scan-qr.component';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-doctors-form',
  templateUrl: './doctors-form.component.html',
  styleUrls: ['./doctors-form.component.sass']
})
export class DoctorsFormComponent implements OnInit {
  hide = true;
  chide = true;
  @Input() doctor: Doctor;
  @Input() loading: boolean;
  @Output() submitDoctor: EventEmitter<Doctor> = new EventEmitter<Doctor>();
  newImage = false;
  imageUrl: string;
  constructor(private doctorService: DoctorService,
              public dialog: MatDialog,
              private messageService: MessageService
              ) { }

  ngOnInit(): void {
    if (isNullOrUndefined(this.doctor)) {
      this.doctor = this.doctorService.initialize();
      this.imageUrl = this.doctor.imageUrl;
    }
  }
  onSubmit(doctor: Doctor) {
    doctor.hashProfileImg = this.doctor.hashProfileImg;
    doctor.imageFile = this.doctor.imageFile;
    this.submitDoctor.emit(doctor);
  }
  loadImage(file) {
    if (file && file[0]) {
      this.doctor.imageFile = file[0];

      let reader = new FileReader();
      reader.readAsDataURL(file[0]);

      reader.onload = () => {

        this.imageUrl = reader.result as string;
        this.newImage = true;

      }
    }
  }
  cancelImage() {
    this.imageUrl = this.doctor.imageUrl;
    this.newImage = false;
    this.doctor.imageFile = null;
  }

  openScanDialog() {
    const dialogRef = this.dialog.open(ScanQrComponent, {
      height: '300px',
      width: '270px'
    });

    dialogRef.afterClosed().subscribe((result:string) => {
        if(result) {
            this.doctor.address = result;
        }
    });
  }
}
