import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Vehicle, Model } from '../models/vehicle.model';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, HttpClientModule, CommonModule],
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  vehicles: Vehicle[] = [];
  vehicleForms: FormArray;
  form: FormGroup;
  numberOfDrivers: number = 1;
  models: Model[][] = []; // Array to store models for each vehicle form

  constructor(
    private vehicleService: VehicleService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.vehicleForms = this.fb.array([]);
    this.form = this.fb.group({
      vehicles: this.vehicleForms
    });
  }

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe((data: Vehicle[]) => {
      this.vehicles = data;
    });

    this.route.queryParams.subscribe(params => {
      const numberOfCars = +params['cars'] || 1;
      this.numberOfDrivers = +params['drivers'] || 1;
      this.addVehicleForms(numberOfCars);
    });
  }

  addVehicleForms(numberOfCars: number) {
    for (let i = 0; i < numberOfCars; i++) {
      this.addVehicleForm();
    }
  }

  addVehicleForm() {
    this.vehicleForms.push(this.createVehicleForm());
    this.models.push([]); // Initialize models array for each vehicle form
  }

  createVehicleForm(): FormGroup {
    return this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required]
    });
  }

  onMakeChange(index: number): void {
    const make = this.vehicleForms.at(index).get('make')?.value;
    const vehicle = this.vehicles.find(v => v.make === make);
    if (vehicle) {
      this.models[index] = vehicle.models; // Update models array for the specific vehicle form
      this.vehicleForms.at(index).get('model')?.setValue('');
      this.vehicleForms.at(index).get('model')?.setValidators([Validators.required]);
      this.vehicleForms.at(index).get('model')?.updateValueAndValidity();
    }
  }

  getYears(index: number): number[] {
    const make = this.vehicleForms.at(index).get('make')?.value;
    const model = this.vehicleForms.at(index).get('model')?.value;
    return this.vehicles.find(v => v.make === make)?.models.find(m => m.name === model)?.years || [];
  }

  onSubmit() {
    const vehicles = this.form.value.vehicles;
    this.router.navigate(['/driver-form'], { queryParams: { vehicles: JSON.stringify(vehicles), drivers: this.numberOfDrivers } });
  }
}