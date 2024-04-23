import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FictionService } from '../../service/fiction.service';
import { CommonModule } from '@angular/common';
import { Fiction } from '../../interface/fiction';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private ficitonService: FictionService) {
    this.getListFiction();
  }

  fictions: Fiction[] = [];

  getListFiction() {
    this.ficitonService.getFictions().subscribe((listFiciton) => {
      this.fictions = listFiciton
    }); 
  }
}
