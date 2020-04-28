import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import { Patient } from '../models/patient.model';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { IpfsService } from './ipfs.service';
import { Diagnosis } from '../models/diagnosis.model';
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(public web3Service: Web3Service, private ipfsService: IpfsService) {
  }

	initialize(): Patient {
		let patient = new Patient();
		patient.imageUrl = this.ipfsService.baseUrl + patient.hashProfileImg;
		return patient;
	}

	create(patient: Patient): Promise<any> {
		return this.web3Service.patientContract.registerPatient(
				patient.address.toLowerCase(),
				patient.name,
				patient.curp,
				patient.birthday.toString(),
				patient.blood,
				patient.mobile,
				patient.genre,
				patient.hashProfileImg,
				patient.password,
				{ from:	this.web3Service.account.toLowerCase() })
	}

	login(user): Promise<any> {
      user.address = this.web3Service.account.toLowerCase();
      console.log(user.address);
      console.log(user.password);
			return this.web3Service.patientContract.loginPatient(user.address, user.password);
	}

		// Return a list of the Patients registered
	list(): Observable<any> {
			// return the total number of registered doctors
		return from(this.web3Service.patientContract.listPatients(this.web3Service.account, {from: this.web3Service.account}));
	}

  // Get Patient Data from its Address
	getByAddress(patientAdressToGet): Observable<any> {
		return from(this.web3Service.patientContract.getPatient(patientAdressToGet.toLowerCase(),
		{ from: this.web3Service.account.toLowerCase()})).pipe(map((response: string) => {
			console.log("patient: ", response);
      let patient: Patient = JSON.parse(response);
      if (patient.hashProfileImg.length < 15) {
        patient.hashProfileImg = "QmTK3tw4NaENb8C9L4XuDnhSDPAxiP577BY3MR3m4VKZ7u";
      }
			patient.imageUrl = this.ipfsService.baseUrl + patient.hashProfileImg;
			return patient;
		}));
	}

	getHistoryList(address) {
		return from(this.web3Service.patientContract.getHistoryPatientByAddress(
			address,
			{from: this.web3Service.account})).pipe(map((response: string) => {
				let history: string[] = response.length? response.split(','): [];
				return history;
			}));
  }

   // Get Patient Data from its Address
	getDiagnosisByIdAndAddress(historyIdToGet, patientAdressToGet): Observable<any> {
		return from(this.web3Service.patientContract.getDiagnosisByIdAndAddress(
      historyIdToGet,
      patientAdressToGet.toLowerCase(),
		  { from: this.web3Service.account.toLowerCase()})).pipe(map((response: string) => {
        let str = response.split('');
        str.splice(response.indexOf("[") - 1, 1)
        str.splice(response.indexOf("]"), 1)
        console.log(str.join(''));
        let diagnosis: Diagnosis = JSON.parse(str.join(''));
        diagnosis.hashFile.forEach(file => {
          file.url = this.ipfsService.baseUrl + file.hash;
        });
			  return diagnosis;
		}));
	}

  addDiagnosis(address, diagnosis: Diagnosis) {
    return this.web3Service.patientContract.addDiagnosisToPatient(
      address.toLowerCase(),
      (new Date).toString(),
      diagnosis.weight.toString(),
      diagnosis.height.toString(),
      diagnosis.description,
      diagnosis.observations,
      JSON.stringify(diagnosis.hashFile),
      { from:	this.web3Service.account.toLowerCase() })
  }

}
