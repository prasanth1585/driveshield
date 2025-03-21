import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showRegister: boolean = false;
  registerUser: any = {};

  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    const loginRequest = {
      username: this.email,
      password: this.password
    };

    this.http.post<{ jwt: string }>('http://localhost:8081/api/users/authenticate', loginRequest)
      .subscribe(response => {
        console.log('Login successful', response);
        const token = response.jwt;
        this.fetchUserDetails(this.email, token);
      }, error => {
        console.error('Error logging in', error);
        this.errorMessage = 'Invalid email or password. Please try again.';
      });
  }

  fetchUserDetails(username: string, token: string) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('X-API-Key', token);

    this.http.get(`http://localhost:8081/api/users/userdetails?username=${encodeURIComponent(username)}`, { headers })
      .subscribe(response => {
        console.log('User details fetched successfully', response);
        localStorage.setItem('userDetails', JSON.stringify(response));
        this.router.navigate(['/dashboard']);
      }, error => {
        console.error('Error fetching user details', error);
      });
  }

  showRegisterForm() {
    this.showRegister = true;
  }

  onRegister() {
    this.http.post('http://localhost:8081/api/users/register', this.registerUser, { responseType: 'text' })
      .subscribe(response => {
        console.log('User registered successfully', response);
        this.showRegister = false;
      }, error => {
        console.error('Error registering user', error);
      });
  }

  onLogout() {
    localStorage.removeItem('userDetails');
    this.router.navigate(['/']);
  }
}