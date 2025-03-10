import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule], // Add any necessary imports here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  zipCode: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Handle zip code submission logic here
    console.log('Zip Code submitted:', this.zipCode);
    this.router.navigate(['/insurance-form']);
  }

  onLogin() {
    // Handle login logic here
    console.log('Login submitted:', { email: this.email, password: this.password });
    // Navigate to a different page after successful login, if needed
    // this.router.navigate(['/dashboard']);
  }
}