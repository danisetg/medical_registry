import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-doctors-profile',
  templateUrl: './doctors-profile.component.html',
  styleUrls: ['./doctors-profile.component.sass']
})
export class DoctorsProfileComponent implements OnInit {
  hide = true;
  chide = true;
  public profile: Doctor;
  constructor(private userService: UserService) {
    this.profile = userService.profile;
   }

  ngOnInit(): void {
  }

  onSubmit(doctor: Doctor){

  }

}
