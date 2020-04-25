import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpfsService {
  public baseUrl =  'https://ipfs.infura.io/ipfs/';
  constructor(private httpClient: HttpClient) { }

  add(formData: FormData) {
    return this.httpClient.post('https://ipfs.infura.io:5001/api/v0/add?', formData);
  }

  uploadFiles(files: File[]) {
    let tasks = [];
    files.forEach(file => {
      let formData = new FormData();
      formData.append("file", file);
      tasks.push(this.add(formData));

    });
    return forkJoin(...tasks);

  }

}
