import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { IpfsService } from 'src/app/shared/services/ipfs.service';
import { UserService } from 'src/app/shared/services/user.service';
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
    private messageService: MessageService,
    private ipfsService: IpfsService,
    private userService: UserService
  ) {
    this.services["patient"] = patientService;
    this.services["doctor"] = doctorService;
  }
  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }
  onSubmit(user: any) {
    this.loading = true;
    this.services[user.userType].login(user).then(res => {
      this.userService.role = user.userType;
      this.userService.getProfile().subscribe(res => {
        console.log(res);
        this.userService.profile = res;
        localStorage.setItem('profile', JSON.stringify(res));
        localStorage.setItem('role', user.userType);
        localStorage.setItem('account', this.doctorService.web3Service.account);
        this.messageService.success("Usuario Logueado Correctamente");
        this.loading = false;
        this.router.navigate([this.returnUrl]);
      });
    }, error => {
      this.messageService.error(error.message);
      this.loading = false;
    });
  }
}
