// filepath: /c:/Users/pvipparl/workspace/DriveShield/src/app/insurance-form/insurance-form.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insurance-form',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.css']
})
export class InsuranceFormComponent {
  numberOfCars: number = 1;
  numberOfDrivers: number = 1;

  constructor(private router: Router) {}

  setNumberOfCars(cars: number) {
    this.numberOfCars = cars;
  }

  setNumberOfDrivers(drivers: number) {
    this.numberOfDrivers = drivers;
  }

  navigateToVehicleForm() {
    this.router.navigate(['/vehicle-form'], { queryParams: { cars: this.numberOfCars, drivers: this.numberOfDrivers } });
  }
}