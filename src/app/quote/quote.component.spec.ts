import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { QuoteComponent } from './quote.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('QuoteComponent', () => {
  let component: QuoteComponent;
  let fixture: ComponentFixture<QuoteComponent>;
  let mockActivatedRoute: { queryParams: any; };
  let mockRouter: { navigate: any; };

  beforeEach(async () => {
    mockActivatedRoute = {
      queryParams: of({
        vehicles: JSON.stringify([{ id: 1 }, { id: 2 }]),
        drivers: JSON.stringify([{ id: 1 }])
      })
    };
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, QuoteComponent], // Import QuoteComponent here
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize vehicles and drivers from query params', () => {
    expect(component.vehicles.length).toBe(2);
    expect(component.drivers.length).toBe(1);
  });

  it('should calculate the quote correctly', () => {
    component.calculateQuote();
    expect(component.quote).toBe(230); // basePrice + (2 * pricePerCar) + (1 * pricePerDriver)
  });

  it('should navigate to payment page with quote', () => {
    component.proceedToPayment();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/payment'], { queryParams: { quote: 230 } });
  });

  it('should update numberOfCars and numberOfDrivers on init', () => {
    expect(component.numberOfCars).toBe(2);
    expect(component.numberOfDrivers).toBe(1);
  });

  it('should handle empty query params', () => {
    mockActivatedRoute.queryParams = of({});
    component.ngOnInit();
    expect(component.vehicles.length).toBe(0);
    expect(component.drivers.length).toBe(0);
    expect(component.numberOfCars).toBe(0);
    expect(component.numberOfDrivers).toBe(0);
    expect(component.quote).toBe(100); // basePrice only
  });
});