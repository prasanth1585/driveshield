import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent] // Import FooterComponent here
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('footer')).toBeDefined();
  });

  it('should have specific classes in the footer element', () => {
    const compiled = fixture.nativeElement;
    const footerElement = compiled.querySelector('footer');
    expect(footerElement.classList).toContain('footer');
    expect(footerElement.classList).toContain('mt-auto');
    expect(footerElement.classList).toContain('py-3');
    expect(footerElement.classList).toContain('bg-dark');
    expect(footerElement.classList).toContain('text-white');
  });
});