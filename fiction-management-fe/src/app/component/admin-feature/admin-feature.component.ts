import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-feature',
  standalone: true,
  imports: [MatCardModule, MatIconModule, RouterLink],
  templateUrl: './admin-feature.component.html',
  styleUrl: './admin-feature.component.css',
})
export class AdminFeatureComponent {
  
}
