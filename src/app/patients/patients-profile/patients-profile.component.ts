import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-patients-profile',
  templateUrl: './patients-profile.component.html',
  styleUrls: ['./patients-profile.component.sass']
})
export class PatientsProfileComponent implements OnInit {
  allowedRoles = ["patient"];
  address: string;
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.validateAccess(this.allowedRoles);
    this.address = this.userService.profile.address;
  }

}
