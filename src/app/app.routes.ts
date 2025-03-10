import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InsuranceFormComponent } from './insurance-form/insurance-form.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { DriverFormComponent } from './driver-form/driver-form.component';
import { QuoteComponent } from './quote/quote.component';
import { PaymentComponent } from './payment/payment.component'; // Import the payment component

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'insurance-form', component: InsuranceFormComponent },
  { path: 'vehicle-form', component: VehicleFormComponent },
  { path: 'driver-form', component: DriverFormComponent },
  { path: 'quote', component: QuoteComponent },
  { path: 'payment', component: PaymentComponent }, // Add the payment route
  // other routes...
];