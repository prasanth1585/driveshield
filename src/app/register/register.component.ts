import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
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

  onRegister() {
    this.http.post('http://localhost:8081/api/users/register', this.registerUser, { responseType: 'text' })
      .subscribe(response => {
        console.log('User registered successfully', response);
        this.router.navigate(['/']);
      }, error => {
        console.error('Error registering user', error);
      });
  }
}
