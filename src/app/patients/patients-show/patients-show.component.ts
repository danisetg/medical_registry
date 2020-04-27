import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/shared/models/patient.model';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { Diagnosis } from 'src/app/shared/models/diagnosis.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-patients-show',
  templateUrl: './patients-show.component.html',
  styleUrls: ['./patients-show.component.scss']
})
export class PatientsShowComponent implements OnInit {
  allowedRoles = ["doctor"];
  patient: Patient;
  doctor: Doctor;
  history: Diagnosis[] = [];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private patientService: PatientService,
              private doctorService: DoctorService,
              private authService: AuthService) { }

  ngOnInit(): void {
      this.authService.validateAccess(this.allowedRoles);
      this.getPatient();
  }

  getPatient() {
    this.patientService.getByAddress(this.route.snapshot.params.address).subscribe(patient => {
      this.patient = patient;
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

}
