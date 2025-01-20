import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-navigation',
  imports: [RouterLink, MatButton],
  templateUrl: './student-navigation.component.html',
  styleUrl: './student-navigation.component.scss'
})
export class StudentNavigationComponent {

}
