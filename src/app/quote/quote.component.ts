import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PolicyService } from '../services/policy.service';
import { Policy, PolicyHolder } from '../interfaces/policy';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  policy: Policy;
  policyHolder: PolicyHolder;
  isSubmitted: boolean = false;
  quoteAmount: number | null = null;
  userProfileForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private policyService: PolicyService
  ) {
    this.policy = this.policyService.getPolicyData();
    this.policyHolder = this.policyService.getPolicyHolderData();
    this.userProfileForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  calculateQuote() {
    this.policyService.calculateQuote().subscribe(response => {
      this.quoteAmount = response;
      console.log('Quote calculated successfully', response);
    }, error => {
      console.error('Error calculating quote', error);
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.calculateQuote();
  }

  submitQuote() {
    if (this.userProfileForm.valid) {
      const { username, password } = this.userProfileForm.value;
      this.policyHolder.username = username;
      this.policyHolder.password = password;
      this.policy.status = 'active';
      this.policy.username = username;
      this.policyService.setPolicyHolderData(this.policyHolder);
      console.log('Policy data', this.policy);

      this.policyService.createPolicy().subscribe(response => {
        console.log('Policy created successfully', response);
        this.policyService.createPolicyHolder().subscribe(response => {
          console.log('Policy holder created successfully', response);
          this.router.navigate(['/login']);
        }, error => {
          console.error('Error creating policy holder', error);
        });
      }, error => {
        console.error('Error creating policy', error);
      });
    }
  }
}