import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { Diagnosis } from 'src/app/shared/models/diagnosis.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IpfsService } from 'src/app/shared/services/ipfs.service';
import { UserService } from 'src/app/shared/services/user.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-doctors-show',
  templateUrl: './doctors-show.component.html',
  styleUrls: ['./doctors-show.component.scss']
})
export class DoctorsShowComponent implements OnInit {
  hide = true;
  nhide = true;
  chide = true;
  newImage = false;
  imageUrl: string;
  loading = false;
  oldPassword = "";
  newPassword = "";
  confirmNewPassword = "";
  changingPassword = false;

  allowedRoles = ["doctor", "patient"];
  doctor: Doctor;
  createdBy: Doctor;
  history: Diagnosis[] = [];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private doctorService: DoctorService,
              private authService: AuthService,
              public userService: UserService,
              private messageService: MessageService,
              public ipfsService: IpfsService) { }

  ngOnInit(): void {
      this.authService.validateAccess(this.allowedRoles);
      this.getDoctor();
  }

  getDoctor() {
    this.doctorService.getByAddress(this.route.snapshot.params.address).subscribe(doctor => {
      this.doctor = doctor;
      this.imageUrl = doctor.imageUrl;
      console.log(this.doctor)
      this.getCreatedBy(doctor.createdBy);
    }, error => {
      console.log(error);
    });
  }

  getCreatedBy(address) {
    this.doctorService.getByAddress(address).subscribe(doctor => {
        this.createdBy = doctor;
    }, error => {
      console.log(error);
    });
  }
  loadImage(file) {
    if (file && file[0]) {
      this.doctor.imageFile = file[0];

      let reader = new FileReader();
      reader.readAsDataURL(file[0]);

      reader.onload = () => {

        this.imageUrl = reader.result as string;
        this.newImage = true;

      }
    }
  }
  cancelImage() {
    this.imageUrl = this.doctor.imageUrl;
    this.newImage = false;
    this.doctor.imageFile = null;
  }

  saveImage() {
    let formData = new FormData();
    this.loading = true;
    formData.append("file", this.doctor.imageFile);
    this.ipfsService.add(formData).subscribe((res: any) => {
        this.doctorService.changeImage(this.doctor.address, res.Hash).then( response => {
          this.loading = false;
          console.log(response);
          this.userService.profile.imageUrl = this.ipfsService.baseUrl + res.Hash;
          this.userService.profile.hashFile = res.Hash;
          localStorage.setItem('profile', JSON.stringify(this.userService.profile));
          this.newImage = false;
          this.doctor.imageUrl = this.imageUrl;
        }, error => {
          console.log(error);
          this.loading = false;
        });
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  changePassword() {
    this.changingPassword = true;
    this.doctorService.changePassword(this.doctor.address, this.oldPassword, this.newPassword).then(res => {
      this.messageService.success("Password changed");
      this.changingPassword = false;
      this.newPassword = this.oldPassword = this.confirmNewPassword = "";
    }, error => {
      this.messageService.error("Incorrect old password");
      console.log(error);
      this.changingPassword = false;
    });
  }

}
