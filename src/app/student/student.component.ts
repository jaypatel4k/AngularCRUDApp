import { Component } from '@angular/core';
import { StudentUploadComponent } from "./student-upload/student-upload.component";

@Component({
  selector: 'app-student',
  imports: [StudentUploadComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {

}
