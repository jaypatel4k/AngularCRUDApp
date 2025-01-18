import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoadspinnerService } from './services/loadspinner.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { ShowSpinnerComponent } from './show-spinner/show-spinner.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ShowSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularCRUDApp';
}
