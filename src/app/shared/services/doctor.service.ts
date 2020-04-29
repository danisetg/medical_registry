import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import { Doctor } from '../models/doctor.model';
import { map, mergeMap, flatMap, concatMap, exhaustMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { IpfsService } from './ipfs.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
	public account: string;
	public profile: Doctor;
	constructor(public web3Service: Web3Service, private ipfsService: IpfsService) {
		this.web3Service.account = web3Service.account;
	}

	initialize(): Doctor {
		let doctor = new Doctor();
		doctor.imageUrl = this.ipfsService.baseUrl + doctor.hashProfileImg;
		return doctor;
	}

	register(doctor: Doctor): Promise<any> {
		return this.web3Service.doctorContract.registerDoctor(
			this.web3Service.account,
			doctor.name,
			doctor.idCard,
			doctor.specialization,
			doctor.email,
			(new Date()).toString(),
			doctor.hashProfileImg,
			doctor.password,
			{ from: this.web3Service.account });
	}

	create(doctor: Doctor): Promise<any> {
		console.log(doctor);
		console.log(this.web3Service.account, doctor.address);
		return this.web3Service.doctorContract.registerDoctor(
			doctor.address.toLowerCase(),
			doctor.name,
			doctor.idCard,
			doctor.specialization,
			doctor.email,
			(new Date()).toString(),
			doctor.hashProfileImg,
			doctor.password,
			{ from: this.web3Service.account.toLowerCase() });
	}

	login(user): Promise<any> {
    user.address = this.web3Service.account;
		return this.web3Service.doctorContract.loginDoctor(user.address, user.password, { from: user.address });
	}

	// Return a list of the Doctors registered
	list(): Observable<any> {
		// return the total number of registered doctors
		return from(this.web3Service.doctorContract.listDoctors(this.web3Service.account, {from: this.web3Service.account}));
	}

	getProfile() {
		this.getByAddress(this.web3Service.account).subscribe(doctor => {
			this.profile = doctor;
			console.log("profile: ", this.profile);
		});
	}

	// Get Doctor Data from its Address
	getByAddress(doctorAddressToGet): Observable<any> {
		return from(this.web3Service.doctorContract.getDoctor(doctorAddressToGet, { from: this.web3Service.account })).pipe(map((response: string) => {
			console.log("doctor: ", response);
      let doctor: Doctor = JSON.parse(response);
      if (doctor.hashProfileImg.length < 15) {
        doctor.hashProfileImg = "QmTK3tw4NaENb8C9L4XuDnhSDPAxiP577BY3MR3m4VKZ7u";
      }
			doctor.imageUrl = this.ipfsService.baseUrl + doctor.hashProfileImg;
			return doctor;
		}));
	}

	async addDiagnosisToPacient(doctorAddress, patientAccount, creationDate, weight, height, description, observations, hashFile) {
		let res = await this.web3Service.doctorContract.addDiagnosisToPatient(patientAccount, creationDate, weight, height, description, observations, hashFile,
			{ from: doctorAddress })
		console.log("RES addDiagnosisToPacient: ", res)
		return res
	}

	async getHistoryPatientByAddress(doctorAddress, patientAccount) {
		let res = await this.web3Service.doctorContract.getHistoryPatientByAddress(patientAccount, { from: doctorAddress })
		console.log("RES getHistoryPatientByAddress: ", res)
		return res;
	}

	async getDiagnosisByIdAndAddress(doctorAddress, patientAccount, diagnosisId) {
		let res = await this.web3Service.doctorContract.getDiagnosisByIdAndAddress(diagnosisId, patientAccount, { from: doctorAddress })
		console.log("RES getDiagnosisByIdAndAddress: ", res)
		return res
  }

  changeDoctorStatus(address, status) {
    console.log(address, status);
    return this.web3Service.doctorContract.setDoctorStatus(address, status, { from: this.web3Service.account });
  }

  changeImage(address, hashImage) {
    return this.web3Service.doctorContract.changeDoctorImage(address, hashImage, { from: this.web3Service.account });
  }

  changePassword(address, oldPassword, newPassword) {
    console.log(oldPassword, newPassword);
    return this.web3Service.doctorContract.changeDoctorpassword(address, oldPassword, newPassword, { from: this.web3Service.account });
  }

  getDatesIds() {
    return from(this.web3Service.datesContract.listDatesIds(this.web3Service.account, 1, { from: this.web3Service.account })).pipe(map((response: string) => {
      let dates: string[] = response.length? response.split(','): [];
      return dates;
    }));;
  }
  getDateById(id) {
    return from(this.web3Service.datesContract.getDate(id, this.web3Service.account, 1, { from: this.web3Service.account })).pipe(map((response: string) => {
      return JSON.parse(response);
    }));;
  }

}
