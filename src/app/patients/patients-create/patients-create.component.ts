import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/shared/models/patient.model';
import { PatientService } from 'src/app/shared/services/patient.service';
import { IpfsService } from 'src/app/shared/services/ipfs.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients-create',
  templateUrl: './patients-create.component.html',
  styleUrls: ['./patients-create.component.sass']
})
export class PatientsCreateComponent implements OnInit {
  loading = false;
  constructor(private patientservice: PatientService,
              private messageService: MessageService,
              private router: Router,
              private ipfsService: IpfsService) { }

  ngOnInit(): void {
  }

  onSubmit(patient: Patient) {
    this.loading = true;
    if(patient.imageFile) {
      this.uploadImageAndCreate(patient);
    } else {
      this.create(patient);
    }
  }

  uploadImageAndCreate(patient: Patient){
    let formData = new FormData();
    formData.append('file', patient.imageFile);
    this.ipfsService.add(formData).subscribe((res: any) => {
      patient.hashProfileImg = res.Hash;
      this.create(patient);
    });
  }

  create(patient: Patient) {
    this.patientservice.create(patient).then(res => {
        this.messageService.success("Patient " + patient.name + " creado correctamente");
        this.router.navigate(['patients/list']);
    }, error => {
        this.messageService.error(error.message);
        this.loading = false;
    });
  }

}
