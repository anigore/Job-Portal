import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor (private httpClient: HttpClient) {}

 

  checkEmailNotTaken(email: string) {
    return this.httpClient.post('http://localhost:3000/jobportal/uniqueEmail/',
    {email});
  }

 
}
