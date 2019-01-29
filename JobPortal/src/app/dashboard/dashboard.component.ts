import { Candidate } from './../candidateSchema';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username : any;
  public fetchedData : Candidate[];

  constructor(private router: Router,public service: HttpService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get("username")
    console.log("my username", this.username);
    this.getUsername()
  }

  logout(): void {
    console.log("Logout");
   this.service.logout(false);
    this.router.navigate(['/login']);
  }

  getUsername(){
    this.service.getCandidateData(this.username).subscribe((res : any) =>{
      this.fetchedData = res.docs
      console.log("data - ",this.fetchedData)
    })
  }

}
