import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/shared/models/patient.model';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { Diagnosis } from 'src/app/shared/models/diagnosis.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { IpfsService } from 'src/app/shared/services/ipfs.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-patients-show',
  templateUrl: './patients-show.component.html',
  styleUrls: ['./patients-show.component.scss']
})
export class PatientsShowComponent implements OnInit {
  hide = true;
  nhide = true;
  chide = true;
  newImage = false;
  imageUrl: string;
  loading = false;
  oldPassword = "";
  newPassword = "";
  confirmNewPassword = "";
  changingPassword = false;


  allowedRoles = ["doctor"];
  @Input() address: string;
  patient: Patient;
  doctor: Doctor;
  history: Diagnosis[] = [];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private patientService: PatientService,
              private doctorService: DoctorService,
              private authService: AuthService,
              private ipfsService: IpfsService,
              private messageService: MessageService,
              public userService: UserService) { }


  ngOnInit(): void {
      this.address = this.route.snapshot.params.address;
      if (this.userService.profile.address === this.address) {
        this.allowedRoles.push("patient");
      }
      this.authService.validateAccess(this.allowedRoles);
      this.getPatient();
  }

  getPatient() {
    this.patientService.getByAddress(this.address).subscribe(patient => {
      this.patient = patient;
      this.imageUrl = patient.imageUrl;
      this.getDoctor(patient.createdBy);
      this.getHistory();
    }, error => {
      console.log(error);
    });
  }

  getDoctor(address) {
    this.doctorService.getByAddress(address).subscribe(doctor => {
        this.doctor = doctor;

    }, error => {
      console.log(error);
    });
  }

  getHistory() {
    this.patientService.getHistoryList(this.patient.address).subscribe((history: string[]) => {
        history.forEach(id => {
          this.getDiagnosisByIdAndAddress(id);
        });
    });
  }

  getDiagnosisByIdAndAddress(id){
    this.patientService.getDiagnosisByIdAndAddress(id, this.patient.address).subscribe(diagnosis => {
      console.log(diagnosis);
      this.getDiagnosisDoctor(diagnosis);
      this.history.push(diagnosis);
    });
  }

  addDiagnosis() {
    this.router.navigate([this.router.url + '/add-diagnosis']);
  }

  getDiagnosisDoctor(diagnosis: Diagnosis) {
    this.doctorService.getByAddress(diagnosis.createdBy).subscribe(doctor => {
      diagnosis.doctor = doctor;
    });
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

  saveImage() {
    let formData = new FormData();
    this.loading = true;
    formData.append("file", this.patient.imageFile);
    this.ipfsService.add(formData).subscribe((res: any) => {
        this.patientService.changeImage(this.patient.address, res.Hash).then( response => {
          this.loading = false;
          console.log(response);
          this.userService.profile.imageUrl = this.ipfsService.baseUrl + res.Hash;
          this.userService.profile.hashFile = res.Hash;
          localStorage.setItem('profile', JSON.stringify(this.userService.profile));
          this.newImage = false;
          this.patient.imageUrl = this.imageUrl;
        }, error => {
          console.log(error);
          this.loading = false;
        });
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  changePassword() {
    this.changingPassword = true;
    this.patientService.changePassword(this.patient.address, this.oldPassword, this.newPassword).then(res => {
      this.messageService.success("Password changed");
      this.changingPassword = false;
      this.newPassword = this.oldPassword = this.confirmNewPassword = "";
    }, error => {
      this.messageService.error("Incorrect old password");
      console.log(error);
    });
  }

}
