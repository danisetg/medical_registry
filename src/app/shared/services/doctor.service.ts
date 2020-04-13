import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import { Doctor } from '../models/doctor.model';
import { map, mergeMap, flatMap, concatMap, exhaustMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService extends Web3Service {

  constructor() { 
    super();
  }

   register(doctor: Doctor): Promise<any> {
		return this.contractInstance.registerDoctor(doctor.address, doctor.name, doctor.idCard, doctor.password,
			{ from: doctor.address });
	}

	login(user): Promise<any> {
		return this.contractInstance.loginDoctor(user.address, user.password, { from: user.address });
	}

	// Return a list of the Doctors registered
	list(address): Observable<any> {
		// return the total number of registered doctors
		return from(this.contractInstance.listDoctors(address, {from: address}));  
	}

	// Get Doctor Data from its Address
	getDoctorByAddress(doctorAddressToGet, doctorAccount): Observable<any> {
		return from(this.contractInstance.getDoctor(doctorAddressToGet, { from: doctorAccount })).pipe(map((response: string) => {
			let arr = response.split(',');
			return {
				address: arr[0],
				name: arr[1],
				idCard: arr[2],
				createdBy: arr[3]
			};
		}));
	}	

	async addDiagnosisToPacient(doctorAddress, patientAccount, creationDate, weight, height, description, observations, hashFile) {
		let res = await this.contractInstance.addDiagnosisToPatient(patientAccount, creationDate, weight, height, description, observations, hashFile,
			{ from: doctorAddress })
		console.log("RES addDiagnosisToPacient: ", res)
		return res
	}

	async getHistoryPatientByAddress(doctorAddress, patientAccount) {
		let res = await this.contractInstance.getHistoryPatientByAddress(patientAccount, { from: doctorAddress })
		console.log("RES getHistoryPatientByAddress: ", res)
		return res;
	}

	async getDiagnosisByIdAndAddress(doctorAddress, patientAccount, diagnosisId) {
		let res = await this.contractInstance.getDiagnosisByIdAndAddress(diagnosisId, patientAccount, { from: doctorAddress })
		console.log("RES getDiagnosisByIdAndAddress: ", res)
		return res
	}
}
