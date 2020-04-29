import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.sass']
})
export class DateTimePickerComponent implements OnInit {
  dateModel: string = "";
  constructor(public dialogRef: MatDialogRef<DateTimePickerComponent>, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let date = this.dateModel.substr(0,4) + '-' + this.dateModel.substr(4,2) + '-' + this.dateModel.substr(6,2) + 'T'
                + this.dateModel.substr(8,2) + ':' + this.dateModel.substr(10,2) + ':' + this.dateModel.substr(12,2) + 'Z';
    console.log(date);

    this.dialogRef.close(new Date(date));
  }

  onCancel() {
    this.dialogRef.close();
  }

}
