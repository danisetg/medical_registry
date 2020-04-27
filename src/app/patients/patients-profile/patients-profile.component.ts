import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-patients-profile',
  templateUrl: './patients-profile.component.html',
  styleUrls: ['./patients-profile.component.sass']
})
export class PatientsProfileComponent implements OnInit {
  allowedRoles = ["patient"];
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.validateAccess(this.allowedRoles);
  }

}
