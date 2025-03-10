import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

interface Vehicle {
  make: string;
  models: Model[];
}

interface Model {
  name: string;
  years: number[];
}

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
      this.vehicleForms.push(this.createVehicleForm());
    }
  }

  createVehicleForm(): FormGroup {
    return this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required]
    });
  }

  getModels(index: number): Model[] {
    const make = this.vehicleForms.at(index).get('make')?.value;
    return this.vehicles.find(v => v.make === make)?.models || [];
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