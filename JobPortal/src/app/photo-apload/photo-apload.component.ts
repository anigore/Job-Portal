import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-photo-apload',
  templateUrl: './photo-apload.component.html',
  styleUrls: ['./photo-apload.component.css']
})
export class PhotoAploadComponent implements OnInit {

  constructor(private http : HttpClient) { }

  ngOnInit() {
    
  }

  onUpload() {
    return this.http.post<any>('http://localhost:3000/jobportal/ProfilePicture/',name).subscribe(res =>{console.log(res)})
  }

}
