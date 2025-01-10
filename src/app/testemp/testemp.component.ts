import { Component } from '@angular/core';
import { ShowtestempComponent } from './showtestemp/showtestemp.component';

@Component({
  selector: 'app-testemp',
  standalone: true,
  imports: [ShowtestempComponent],
  templateUrl: './testemp.component.html',
  styleUrl: './testemp.component.scss'
})
export class TestempComponent {

}
