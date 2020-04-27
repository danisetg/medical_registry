import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService, private router: Router) { }
  public isLoggedIn() {
    return !isNullOrUndefined(localStorage.getItem('profile'));
  }
  validateAccess(allowedRoles: string[]) {
    if(!allowedRoles.includes(this.userService.role)) {
      this.router.navigate(["authentication/forbidden"]);
    }
  }
}
