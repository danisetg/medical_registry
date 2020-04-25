import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable, from } from 'rxjs';
import { Web3Service } from './services/web3.service';
import { DoctorService } from './services/doctor.service';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, public web3Service: Web3Service,
              private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    
    if(this.auth.isLoggedIn()){
      return true;
    }
      

    else{
      console.log(route);
      this.router.navigate(['authentication/signin'], {queryParams: {returnUrl: route.url.join('')}})
      return false;
    }
    
    
  }
}
