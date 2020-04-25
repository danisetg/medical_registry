import { Component, OnInit } from '@angular/core';
import { Diagnosis } from 'src/app/shared/models/diagnosis.model';
import { PatientService } from 'src/app/shared/services/patient.service';
import { IpfsService } from 'src/app/shared/services/ipfs.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diagnosis-create',
  templateUrl: './diagnosis-create.component.html',
  styleUrls: ['./diagnosis-create.component.sass']
})
export class DiagnosisCreateComponent implements OnInit {
  loading = false;
  constructor(private patientService: PatientService,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute,
              private ipfsService: IpfsService) { }

  ngOnInit(): void {
  }

  onSubmit(diagnosis: Diagnosis) {
    this.loading = true;
    if(diagnosis.files.length) {
      this.uploadImageAndCreate(diagnosis);
    } else {
      this.create(diagnosis);
    }
  }

  uploadImageAndCreate(diagnosis: Diagnosis){
    this.ipfsService.uploadFiles(diagnosis.files).subscribe(result => {
       for(let i = 0; i < result.length; i++) {
         diagnosis.hashFile[i].hash = result[i].Hash;
       }
       this.create(diagnosis);
    }, error => {
      console.log(error);
    });
  }

  create(diagnosis: Diagnosis) {
    this.patientService.addDiagnosis(this.route.snapshot.params.address, diagnosis).then(res => {
        this.messageService.success("Diagnosis created correctly");
        this.router.navigate(['patients/' + this.route.snapshot.params.address]);
    }, error => {
        this.messageService.error(error.message);
        this.loading = false;
    });
  }

}
