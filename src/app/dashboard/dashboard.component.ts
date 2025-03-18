import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../pipe/capitalize.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userDetails: any;
  firstName: string = '';
  lastName: string = '';
  policies: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const userDetailsString = localStorage.getItem('userDetails');
      if (userDetailsString) {
        this.userDetails = JSON.parse(userDetailsString);
        this.firstName = this.userDetails.firstName;
        this.lastName = this.userDetails.lastName;
        this.fetchPolicies(this.userDetails.username);
      }
    }
  }

  fetchPolicies(username: string) {
    this.http.get<any[]>(`http://localhost:8082/api/policies/user/${username}`)
      .subscribe(response => {
        this.policies = response;
      }, error => {
        console.error('Error fetching policies', error);
      });
  }

  onLogout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('userDetails');
    }
    this.router.navigate(['/']);
  }
}