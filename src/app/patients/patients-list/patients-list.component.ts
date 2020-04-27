import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Patient } from 'src/app/shared/models/patient.model';
import { PatientService } from 'src/app/shared/services/patient.service';
import { IpfsService } from 'src/app/shared/services/ipfs.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.sass']
})
export class PatientsListComponent implements OnInit {
  allowedRoles = ["doctor"];
  displayedColumns = [
    'img',
    'name',
    'mobile',
    'genre',
    'blood',
    'birthday',
    'actions'
  ];
  index: number;
  id: number;
  patients: Patient[] = [];
  loading = false;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public patientservice: PatientService,
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
  viewPatient(patient: Patient) {
      this.router.navigate(['patients/' + patient.address]);
  }
  onCreate() {
    this.router.navigate(['patients/create']);
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
    this.patientservice.list().subscribe( accounts => {
      console.log(accounts);
      accounts.forEach(account => {
        this.patientservice.getByAddress(account).subscribe(patient => {
          this.patients.push(patient);
          this.loading = !(this.patients.length === accounts.length);
          console.log(this.loading);
          console.log(patient);
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
}
