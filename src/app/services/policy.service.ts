import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policy, PolicyHolder, StandardCoverage } from '../interfaces/policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private policy: Policy = {
    id: 0,
    policyNumber: '',
    startDate: '',
    endDate: '',
    status: '',
    vehicles: [],
    drivers: [],
    policyCoverages: [],
    username: ''
  };

  private policyHolder: PolicyHolder = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    dob: '',
    licenseNumber: '',
    username: ''
  };

  constructor(private http: HttpClient) {}

  setPolicyData(data: Partial<Policy>) {
    this.policy = { ...this.policy, ...data };
  }

  getPolicyData(): Policy {
    return this.policy;
  }

  setPolicyHolderData(data: PolicyHolder) {
    this.policyHolder = data;
  }

  getPolicyHolderData(): PolicyHolder {
    return this.policyHolder;
  }

  createPolicy(): Observable<Policy> {
    return this.http.post<Policy>('http://localhost:8082/api/policies', this.policy);
  }

  getStandardCoverages(): Observable<StandardCoverage[]> {
    return this.http.get<StandardCoverage[]>('http://localhost:8082/api/policies/standard-coverages');
  }

  createPolicyHolder(): Observable<string> {
    return this.http.post('http://localhost:8081/api/users/register', this.policyHolder, { responseType: 'text' });
  }

  calculateQuote(): Observable<number> {
    return this.http.post<number>('http://localhost:8082/api/quotes/calculate', this.policy);
  }
}