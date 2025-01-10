import { Component } from '@angular/core';
import { ShowEmployeeComponent } from './show-employee/show-employee.component';

@Component({
  selector: 'app-employee',
  imports: [ShowEmployeeComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {

}
