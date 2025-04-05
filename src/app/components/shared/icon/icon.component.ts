import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent {
  @Input() name!: string;
  @Input() class: string = '';
  
  @Input()
  width: number = 5;

  @Input()
  height: number = 5;

  get calcWidth() {
    return this.width * 0.25;
  }

  get calcHeight() {
    return this.height * 0.25;
  }
}
