import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { NgIf } from '@angular/common';
import * as XLSX from 'xlsx';
import { FormsModule } from '@angular/forms';
import { StudentServiceService } from '../../services/student-service.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { HttpParams } from '@angular/common/http';
import { MatInput } from '@angular/material/input';

interface Division {
  value: string;
  viewValue: string;
}

interface Standard {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-student-upload',
  standalone: true,
  imports: [JsonPipe, NgIf, FormsModule, CommonModule, MatLabel, MatSelect, MatOption, MatFormField],
  templateUrl: './student-upload.component.html',
  styleUrl: './student-upload.component.scss'
})
export class StudentUploadComponent {
  excelData: any[] | undefined;
  message: string | undefined;
  file: File | undefined;
  @ViewChild('fileinput')
  upoadinput!: ElementRef;


  selectedDivision: string | undefined;
  selectedStandard: string | undefined;
  selectedDivisionId: string = '';
  selectedStandardId: string = '';


  divisions: Division[] = [
    { value: '1', viewValue: 'A' },
    { value: '2', viewValue: 'B' }
  ];

  standards: Standard[] = [
    { value: '1', viewValue: 'X' },
    { value: '2', viewValue: 'XI' }
  ];

  constructor(private service: StudentServiceService) { }
  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  changeDivision(event: any) {
    this.selectedDivisionId = event.value;
  }
  changeStandard(event: any) {
    this.selectedStandardId = event.value;
  }
  uploadFiles(filesElement: HTMLInputElement) {

    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file);
      console.log(formData);
      let params = new HttpParams({ fromString: 'divisionId=' + this.selectedDivisionId + '&standadId=' + this.selectedStandardId });

      this.service.UploadStudent(formData, params).subscribe(result => {
        this.message = result;
        this.selectedDivision = "";
        this.selectedStandard = "";
        this.upoadinput.nativeElement.value = "";
        alert(result.success);
      })
    } else {
      alert('Please select files to upload!');
    }
  }


}


