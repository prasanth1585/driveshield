export interface Policy {
    id: number;
    policyNumber: string;
    startDate: string;
    endDate: string;
    status: string;
    vehicles: Vehicle[];
    drivers: Driver[];
    policyCoverages: PolicyCoverage[];
    username: string;
  }
  
  export interface Vehicle {
    id: number;
    autoPolicy: string;
    vin: string;
    make: string;
    model: string;
    year: number;
    primary: boolean;
  }
  
  export interface Driver {
    id: number;
    autoPolicy: string;
    firstName: string;
    lastName: string;
    dob: string;
    licenseNumber: string;
    primary: boolean;
  }
  
  export interface PolicyCoverage {
    coverageId: number;
    autoPolicy: string;
    standardCoverage: StandardCoverage;
    limitAmount: number;
  }
  
  export interface StandardCoverage {
    id: number;
    name: string;
    description: string;
    premiumRate: number;
  }

  export interface PolicyHolder {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
    address: string;
    dob: string;
    licenseNumber: string;
  }