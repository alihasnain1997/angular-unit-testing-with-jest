import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.scss',
})
export class TestingComponent {
  @Input() title: string = 'Default Title';
  @Input() subtitle?: string;
}
