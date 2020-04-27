import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-patients-update',
  templateUrl: './patients-update.component.html',
  styleUrls: ['./patients-update.component.sass']
})
export class PatientsUpdateComponent implements OnInit {
  allowedRoles = ["doctor"];
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.validateAccess(this.allowedRoles);
  }
}
