import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-doctors-profile',
  templateUrl: './doctors-profile.component.html',
  styleUrls: ['./doctors-profile.component.sass']
})
export class DoctorsProfileComponent implements OnInit {
  allowedRoles = ["doctor"];
  hide = true;
  chide = true;
  public profile: Doctor;
  constructor(private userService: UserService, private authService: AuthService) {
    this.profile = userService.profile;

   }

  ngOnInit(): void {
    this.authService.validateAccess(this.allowedRoles);
  }

  onSubmit(doctor: Doctor){

  }

}
