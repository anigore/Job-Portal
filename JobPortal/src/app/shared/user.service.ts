import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:3000/jobportal/uniqueEmail/"

  constructor(private http : HttpClient) { }

  
}
