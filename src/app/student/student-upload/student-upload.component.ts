import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { NgIf } from '@angular/common';
import * as XLSX from 'xlsx';
import { FormsModule } from '@angular/forms';
import { StudentServiceService } from '../../services/student-service.service';

@Component({
  selector: 'app-student-upload',
  standalone: true,
  imports: [JsonPipe, NgIf, FormsModule, CommonModule],
  templateUrl: './student-upload.component.html',
  styleUrl: './student-upload.component.scss'
})
export class StudentUploadComponent {
  excelData: any[] | undefined;
  message: string | undefined;
  file: File | undefined;
  constructor(private service: StudentServiceService) { }
  onFileChange(event: any) {
    //const file = event.target.files[0];
    // const reader = new FileReader();
    // reader.onload = (e: any) => {
    //   const workbook = XLSX.read(e.target.result, { type: 'binary' });
    //   const firstSheetName = workbook.SheetNames[0];
    //   const worksheet = workbook.Sheets[firstSheetName];
    //   this.excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    //   console.log('Excel data:', this.excelData);
    // };
    // // reader.readAsBinaryString(file); // depricated
    // reader.readAsArrayBuffer(file);
    // let formData = new FormData();
    // formData.append('file', event.target.files[0]);
    // this.service.UploadStudentData(formData).subscribe(result => {
    //  this.message = result.toString();
    this.file = event.target.files[0];
    //console.log(this.file);
  }

  uploadFiles(filesElement: HTMLInputElement) {

    // Check whether the files array is not undefined
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file);
      console.log(formData);
      this.service.UploadStudentData(formData).subscribe(result => {
        this.message = result.toString();
      })
    } else {
      alert('Please select files to upload!');
    }
  }


}


