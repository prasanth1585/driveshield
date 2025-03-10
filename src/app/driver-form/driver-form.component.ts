import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css']
})
export class DriverFormComponent implements OnInit {
  driverForms: FormArray;
  form: FormGroup;
  vehicles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.driverForms = this.fb.array([]);
    this.form = this.fb.group({
      drivers: this.driverForms
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const numberOfDrivers = +params['drivers'] || 1;
      this.vehicles = JSON.parse(params['vehicles'] || '[]');
      this.addDriverForms(numberOfDrivers);
    });
  }

  addDriverForms(numberOfDrivers: number) {
    for (let i = 0; i < numberOfDrivers; i++) {
      this.driverForms.push(this.createDriverForm());
    }
  }

  createDriverForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      licenseNumber: ['', Validators.required]
    });
  }

  onSubmit() {
    const drivers = this.form.value.drivers;
    this.router.navigate(['/quote'], { queryParams: { vehicles: JSON.stringify(this.vehicles), drivers: JSON.stringify(drivers) } });
  }
}