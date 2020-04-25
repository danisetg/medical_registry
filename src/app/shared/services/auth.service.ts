import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public isLoggedIn() {
    return !isNullOrUndefined(localStorage.getItem('profile'));
  }
}
