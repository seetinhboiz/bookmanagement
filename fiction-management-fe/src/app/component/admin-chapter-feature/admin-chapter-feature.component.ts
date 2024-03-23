import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditorModule } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-admin-chapter-feature',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    EditorModule,
  ],
  templateUrl: './admin-chapter-feature.component.html',
  styleUrl: './admin-chapter-feature.component.css',
})
export class AdminChapterFeatureComponent {
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount',
  };
}
