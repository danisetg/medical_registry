import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { IpfsService } from 'src/app/shared/services/ipfs.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.sass']
})
export class DoctorsListComponent implements OnInit {
  allowedRoles = ["doctor", "patient"];
  displayedColumns = [
    'img',
    'name',
    'email',
    'specialization',
    'joiningDate',
    'actions'
  ];
  index: number;
  id: number;
  doctors: Doctor[] = [];
  loading = false;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public doctorService: DoctorService,
    public ipfsService: IpfsService,
    private router: Router,
    private authService: AuthService
  ) {}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  ngOnInit() {
    this.authService.validateAccess(this.allowedRoles);
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  onCreate() {
    this.router.navigate(['doctors/create']);
  }
  editCall(row) {
  }
  deleteItem(i: number, row) {
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  loadData() {
    this.loading = true;
    this.doctorService.list().subscribe( accounts => {
      console.log(accounts);
      accounts.forEach(account => {
        this.doctorService.getByAddress(account).subscribe(doctor => {
          this.doctors.push(doctor);
          this.loading = !(this.doctors.length === accounts.length);
          console.log(this.loading);
          console.log(doctor);
        });
      })

    });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
  viewDoctor(doctor: Doctor) {
    this.router.navigate(['doctors/' + doctor.address]);
}
}
