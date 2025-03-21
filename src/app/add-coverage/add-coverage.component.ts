import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PolicyService } from '../services/policy.service';
import { PolicyCoverage, StandardCoverage } from '../interfaces/policy';

@Component({
  selector: 'app-add-coverage',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './add-coverage.component.html',
  styleUrls: ['./add-coverage.component.css']
})
export class AddCoverageComponent implements OnInit {
  form: FormGroup;
  standardCoverages: StandardCoverage[] = [];
  selectedCoverages: StandardCoverage[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private policyService: PolicyService
  ) {
    this.form = this.fb.group({
      standardCoverageId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.policyService.getStandardCoverages().subscribe(coverages => {
      this.standardCoverages = coverages;
    });
  }

  onCoverageSelect() {
    const selectedCoverageId = Number(this.form.value.standardCoverageId); // Ensure it's a number
    const selectedCoverage = this.standardCoverages.find(sc => sc.id === selectedCoverageId);
    if (selectedCoverage) {
      this.selectedCoverages.push(selectedCoverage);
      this.standardCoverages = this.standardCoverages.filter(sc => sc.id !== selectedCoverageId);
      this.form.get('standardCoverageId')?.setValue(null); // Reset the dropdown
    }
  }

  removeSelectedCoverage(index: number) {
    const removedCoverage = this.selectedCoverages.splice(index, 1)[0];
    this.standardCoverages.push(removedCoverage);
  }

  onSubmit() {
    const policyCoverages: PolicyCoverage[] = this.selectedCoverages.map((coverage: StandardCoverage) => ({
      coverageId: coverage.id, // Use the standardCoverage id
      autoPolicy: '',
      standardCoverage: coverage,
      limitAmount: coverage.premiumRate // Use the limit amount from standard coverage
    }));

    this.policyService.setPolicyData({ policyCoverages });
    this.router.navigate(['/quote']);
  }
}