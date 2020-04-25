import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { MessageService } from 'src/app/shared/services/message.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  loading = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public doctorService: DoctorService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(doctor: Doctor) {    
      doctor.hashProfileImg = "QmTK3tw4NaENb8C9L4XuDnhSDPAxiP577BY3MR3m4VKZ7u";
      this.loading = true;
      this.doctorService.register(doctor).then(res => {
        this.messageService.success("Doctor Registrado Correctamente");
        this.loading = false;
        this.router.navigate(['/dashboard']);
      }, error => {
        this.messageService.error(error.message);
        this.loading = false;
      });
      
  }
}
