import { Injectable } from '@angular/core';
import { DoctorService } from './doctor.service';
import { PatientService } from './patient.service';
import { Doctor } from '../models/doctor.model';
import { Patient } from '../models/patient.model';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { IpfsService } from './ipfs.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  services: any[] = [];
  role: string;
  public profile: any;
  constructor(private doctorService: DoctorService, private patientService: PatientService, private ipfsService: IpfsService) {
    if(!isNullOrUndefined(localStorage.getItem('profile')) ){
      this.role = localStorage.getItem('role');
      this.profile = JSON.parse(localStorage.getItem('profile'));
      console.log(this.role);
      console.log(this.profile);
    }
    this.services['doctor'] = doctorService;
    this.services['patient'] = patientService;
  }

  public getProfile(): Observable<any>{
    return this.services[this.role].getByAddress(this.services[this.role].web3Service.account);
  }
}
