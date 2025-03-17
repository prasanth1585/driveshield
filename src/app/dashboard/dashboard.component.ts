import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userDetails: any;
  username: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const userDetailsString = localStorage.getItem('userDetails');
      if (userDetailsString) {
        this.userDetails = JSON.parse(userDetailsString);
        this.username = this.userDetails.email;
      }
    }
  }

  onLogout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('userDetails');
    }
    this.router.navigate(['/']);
  }
}
