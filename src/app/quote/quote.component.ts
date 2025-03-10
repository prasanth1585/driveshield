import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  vehicles: any[] = [];
  drivers: any[] = [];
  numberOfCars: number = 0;
  numberOfDrivers: number = 0;
  quote: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.vehicles = JSON.parse(params['vehicles'] || '[]');
      this.drivers = JSON.parse(params['drivers'] || '[]');
      this.numberOfCars = this.vehicles.length;
      this.numberOfDrivers = this.drivers.length;
      this.calculateQuote();
    });
  }

  calculateQuote() {
    // Sample calculation: base price + price per car + price per driver
    const basePrice = 100;
    const pricePerCar = 50;
    const pricePerDriver = 30;
    this.quote = basePrice + (this.numberOfCars * pricePerCar) + (this.numberOfDrivers * pricePerDriver);
  }

  proceedToPayment() {
    // Navigate to the payment page
    this.router.navigate(['/payment'], { queryParams: { quote: this.quote } });
  }
}