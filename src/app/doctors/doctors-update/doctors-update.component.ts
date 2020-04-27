import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-doctors-update',
  templateUrl: './doctors-update.component.html',
  styleUrls: ['./doctors-update.component.sass']
})
export class DoctorsUpdateComponent implements OnInit {
  allowedRoles = ["doctor"];
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.validateAccess(this.allowedRoles);
  }

}
