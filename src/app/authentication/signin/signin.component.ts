import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { PatientService } from 'src/app/shared/services/patient.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loading = false;
  returnUrl: string;
  hide = true;
  services: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public doctorService: DoctorService,
    public patientService: PatientService,
    private messageService: MessageService
  ) {
    this.services["patient"] = patientService;
    this.services["doctor"] = doctorService;
  }
  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/main';
  }
  onSubmit(user: any) {
    if(!user.address) {
      user.address = this.doctorService.account;
    }
    this.loading = true;
    this.services[user.userType].login(user).then(res => {
      this.messageService.success("Usuario Logueado Correctamente");
      this.loading = false;
      console.log(res);
      this.router.navigate(['/dashboard']);
    }, error => {
      this.messageService.error(error.message);
      this.loading = false;
    });
  }
}
