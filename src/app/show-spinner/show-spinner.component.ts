import { Component, input } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadspinnerService } from '../services/loadspinner.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-show-spinner',
  imports: [NgIf, MatProgressSpinner, AsyncPipe],
  templateUrl: './show-spinner.component.html',
  styleUrl: './show-spinner.component.scss'
})
export class ShowSpinnerComponent {
  loading$: Observable<boolean> | undefined;
  constructor(public loadspinnerService: LoadspinnerService) {

  }
  ngOnInit(): void {
    this.loading$ = this.loadspinnerService.loading$; // Subscribe to loading state
  }
}
