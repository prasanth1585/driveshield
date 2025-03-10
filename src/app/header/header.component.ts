import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngOnInit() {
    if (this.isBrowser) {
      const bootstrap = await import('bootstrap'); // Lazy load Bootstrap

      // Initialize dropdowns manually
      document.querySelectorAll('.dropdown-toggle').forEach((dropdown) => {
        new bootstrap.Dropdown(dropdown);
      });

      // Enable hover functionality for dropdowns
      document.querySelectorAll('.nav-item.dropdown').forEach((dropdown) => {
        dropdown.addEventListener('mouseenter', () => {
          const toggle = dropdown.querySelector('.dropdown-toggle') as HTMLElement;
          if (toggle) {
            new bootstrap.Dropdown(toggle).show();
          }
        });

        dropdown.addEventListener('mouseleave', () => {
          const toggle = dropdown.querySelector('.dropdown-toggle') as HTMLElement;
          if (toggle) {
            new bootstrap.Dropdown(toggle).hide();
          }
        });
      });
    }
  }
}
