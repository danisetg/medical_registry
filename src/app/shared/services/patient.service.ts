import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import { Patient } from '../models/patient.model';
@Injectable({
  providedIn: 'root'
})
export class PatientService extends Web3Service {

  constructor() { 
    super();
  }

  register(patient: Patient): Promise<any> {
	  return this.contractInstance.registerPatient(patient.address, patient.name, patient.curp, patient.birthday, patient.blood, patient.password,
			{ from: patient.doctorAddress })
  }
  
  login(user): Promise<any> {
		return this.contractInstance.loginPatient(user.address, user.password)
  }
  
  	// Return a list of the Patients registered
	list(address): Promise<any> {
		// return the total number of registered doctors
		return this.contractInstance.listPatients(address, {from: address});  
	}
}
