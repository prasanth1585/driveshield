import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PolicyService } from '../services/policy.service';
import { PolicyHolder, Driver } from '../interfaces/policy';

@Component({
  selector: 'app-insurance-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.css']
})
export class InsuranceFormComponent implements OnInit {
  form: FormGroup;
  insuranceStatus: boolean | null = null;
  numberOfCars: number | null = null;
  numberOfDrivers: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private policyService: PolicyService
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      dob: ['', Validators.required] // Added dob field
    });
  }

  ngOnInit(): void {}

  setInsuranceStatus(status: boolean) {
    this.insuranceStatus = status;
  }

  setNumberOfCars(number: number) {
    this.numberOfCars = number;
  }

  setNumberOfDrivers(number: number) {
    this.numberOfDrivers = number;
  }

  onSubmit() {
    if (this.form.valid) {
      const policyHolder: PolicyHolder = this.form.value;
      this.policyService.setPolicyHolderData(policyHolder);

      const primaryDriver: Driver = {
        id: 0,
        autoPolicy: '',
        firstName: policyHolder.firstName,
        lastName: policyHolder.lastName,
        dob: policyHolder.dob, // Map dob field
        licenseNumber: policyHolder.licenseNumber,
        primary: true
      };

      this.policyService.setPolicyData({ drivers: [primaryDriver] });
      this.navigateToVehicleForm();
    }
  }

  navigateToVehicleForm() {
    this.router.navigate(['/vehicle-form'], { queryParams: { cars: this.numberOfCars, drivers: this.numberOfDrivers } });
  }
}