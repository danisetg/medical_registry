import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { Diagnosis } from 'src/app/shared/models/diagnosis.model';

@Component({
  selector: 'app-doctors-show',
  templateUrl: './doctors-show.component.html',
  styleUrls: ['./doctors-show.component.scss']
})
export class DoctorsShowComponent implements OnInit {
  doctor: Doctor;
  createdBy: Doctor;
  history: Diagnosis[] = [];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private doctorService: DoctorService) { }

  ngOnInit(): void {
      this.getDoctor();
  }

  getDoctor() {
    this.doctorService.getByAddress(this.route.snapshot.params.address).subscribe(doctor => {
      this.doctor = doctor;
      console.log(this.doctor)
      this.getCreatedBy(doctor.createdBy);
    }, error => {
      console.log(error);
    });
  }

  getCreatedBy(address) {
    this.doctorService.getByAddress(address).subscribe(doctor => {
        this.createdBy = doctor;
    }, error => {
      console.log(error);
    });
  }

}
