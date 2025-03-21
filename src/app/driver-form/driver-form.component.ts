import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PolicyService } from '../services/policy.service';
import { Driver } from '../interfaces/policy';

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private policyService: PolicyService
  ) {
    this.driverForms = this.fb.array([]);
    this.form = this.fb.group({
      drivers: this.driverForms
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const numberOfDrivers = +params['drivers'] || 1;
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      isPrimary: [false, Validators.required]
    });
  }

  navigateToAddCoverage() {
    const newDrivers: Driver[] = this.form.value.drivers.map((driver: any) => ({
      id: 0,
      autoPolicy: '',
      firstName: driver.firstName,
      lastName: driver.lastName,
      dob: driver.dob,
      licenseNumber: driver.licenseNumber,
      primary: driver.isPrimary
    }));

    const existingDrivers = this.policyService.getPolicyData().drivers || [];
    const allDrivers = [...existingDrivers, ...newDrivers];

    this.policyService.setPolicyData({ drivers: allDrivers });
    this.router.navigate(['/add-coverage']);
  }
}