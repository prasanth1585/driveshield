import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HomeComponent] // Import HomeComponent here
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /insurance-form on zip code submission', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.zipCode = '12345';
    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['/insurance-form']);
  });

  it('should log zip code on submission', () => {
    const consoleSpy = spyOn(console, 'log');
    component.zipCode = '12345';
    component.onSubmit();
    expect(consoleSpy).toHaveBeenCalledWith('Zip Code submitted:', '12345');
  });

  it('should log login details on login', () => {
    const consoleSpy = spyOn(console, 'log');
    component.email = 'test@example.com';
    component.password = 'password123';
    component.onLogin();
    expect(consoleSpy).toHaveBeenCalledWith('Login submitted:', { email: 'test@example.com', password: 'password123' });
  });
});