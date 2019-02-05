import { Candidate } from './../candidateSchema';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
import { AutoLogoutService } from '../auto-logout.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers:[AutoLogoutService],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: any;
  public fetchedData: Candidate[];

  constructor(private router: Router,
    public service: HttpService,
    private route: ActivatedRoute,
    private autoLogoutService:AutoLogoutService) { }

  ngOnInit() {
    this.getUsername();
    localStorage.setItem('lastAction', Date.now().toString());
  }

  logout(): void {
    console.log("Logout");
    this.service.logout();

    this.router.navigate(['/login']);
  }

  getUsername() {
    this.username = this.service.getToken();
    this.service.getCandidateData(this.username).subscribe((res: any) => {
      this.fetchedData = res.docs
      console.log("data - ", this.fetchedData)
    })
  }

}
