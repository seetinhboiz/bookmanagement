import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './component/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, HeaderComponent, RouterModule],
  // templateUrl: './app.component.html',
  template: `
    <main>
      <div class="header">
        <app-header></app-header>
      </div>

      <a [routerLink]="['/']">
        <header class="brand-name">
          <img
            class="brand-logo"
            src="https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/blue_repicthousebase_1484336386-1.png"
            alt="logo"
            aria-hidden="true"
          />
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  // title = 'fiction-management-fe';
  title = 'homes';
}
