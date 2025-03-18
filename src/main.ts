import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HeaderComponent } from './app/header/header.component';
import { HomeComponent } from './app/home/home.component';
import { InsuranceFormComponent } from './app/insurance-form/insurance-form.component';
import { VehicleFormComponent } from './app/vehicle-form/vehicle-form.component';
import { DriverFormComponent } from './app/driver-form/driver-form.component';
import { QuoteComponent } from './app/quote/quote.component';
import { PaymentComponent } from './app/payment/payment.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { RegisterComponent } from './app/register/register.component';
import { CapitalizePipe } from './app/pipe/capitalize.pipe';
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // ✅ Correctly provide HttpClient
    provideRouter(
      [
          { path: '', component: HomeComponent },
          { path: 'insurance-form', component: InsuranceFormComponent },
          { path: 'vehicle-form', component: VehicleFormComponent },
          { path: 'driver-form', component: DriverFormComponent },
          { path: 'quote', component: QuoteComponent },
          { path: 'payment', component: PaymentComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'register', component: RegisterComponent },
      ],
      withComponentInputBinding()
    ),
    importProvidersFrom(CapitalizePipe)
  ]
}).catch(err => console.error(err));
