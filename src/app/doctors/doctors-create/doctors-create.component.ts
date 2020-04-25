import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { IpfsService } from 'src/app/shared/services/ipfs.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors-create',
  templateUrl: './doctors-create.component.html',
  styleUrls: ['./doctors-create.component.sass']
})
export class DoctorsCreateComponent implements OnInit {
  loading = false;
  constructor(private doctorService: DoctorService,
              private messageService: MessageService,
              private router: Router,
              private ipfsService: IpfsService) { }

  ngOnInit(): void {
  }

  onSubmit(doctor: Doctor) {
    this.loading = true;
    if(doctor.imageFile) {
      this.uploadImageAndCreate(doctor);
    } else {
      this.create(doctor);
    }
  }

  uploadImageAndCreate(doctor: Doctor){
    let formData = new FormData();
    formData.append('file', doctor.imageFile);
    this.ipfsService.add(formData).subscribe((res: any) => {
      doctor.hashProfileImg = res.Hash;
      this.create(doctor);
    });
  }

  create(doctor: Doctor) {
    this.doctorService.create(doctor).then(res => {
        this.messageService.success("Doctor " + doctor.name + " creado correctamente");
        this.router.navigate(['doctors/list']);
    }, error => {
        this.messageService.error(error.message);
        this.loading = false;
    });
  }

}
