import { Component } from '@angular/core';
import { ShowDepartmentComponent } from './show-department/show-department.component';

@Component({
  selector: 'app-department',
  imports: [ShowDepartmentComponent],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent {

}
