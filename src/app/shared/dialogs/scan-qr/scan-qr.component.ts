import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss']
})
export class ScanQrComponent implements OnInit {
  selectedCamera = null;
  cameras: any[] = [];
  enable = false;
  constructor( public dialogRef: MatDialogRef<ScanQrComponent>, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  setCameras(cameras) {
    this.cameras = cameras;
    console.log(cameras);
  }
  selectCamera(camera) {
    console.log(camera);
    this.enable = true;
    this.selectedCamera = camera;
  }

  onScanned(value:string): void {
    console.log(value);
    if(value.includes('ethereum:')) {
      this.dialogRef.close(value.replace('ethereum:', ''));
    } else {
      this.messageService.error('Please scan a valid Metamask Etherum QR code');
    }
    
  }

}
