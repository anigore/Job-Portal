import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private source = new BehaviorSubject('default message');
  currentData = this.source.asObservable();

  constructor(private http : HttpClient) { }

  sendData(candidate : any)    {
    this.source.next(candidate)
  }
}
