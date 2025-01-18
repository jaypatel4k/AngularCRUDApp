import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-navigation',
  imports: [MatToolbar, RouterLink],
  templateUrl: './student-navigation.component.html',
  styleUrl: './student-navigation.component.scss'
})
export class StudentNavigationComponent {

}
