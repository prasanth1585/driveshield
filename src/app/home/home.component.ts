import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  zipCode: string = '';
  email: string = '';
  password: string = '';
  showRegister: boolean = false;
  registerUser: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    username: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    // Handle zip code submission logic here
  console.log('Zip Code submitted:', this.zipCode);
  this.router.navigate(['/insurance-form']);
  }

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
      });
  }

  fetchUserDetails(username: string, token: string) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('X-API-Key', token); // Ensure backend accepts this
  
    this.http.get(`http://localhost:8081/api/users/userdetails?username=${encodeURIComponent(username)}`, 
      { headers }) // Remove `withCredentials: true` if using JWT
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
}