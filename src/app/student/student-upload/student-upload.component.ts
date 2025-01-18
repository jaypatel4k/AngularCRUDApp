import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { NgIf } from '@angular/common';
import * as XLSX from 'xlsx';
import { FormsModule } from '@angular/forms';
import { StudentServiceService } from '../../services/student-service.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { HttpParams } from '@angular/common/http';
import { StudentNavigationComponent } from '../student-navigation/student-navigation.component';
import { Division } from '../../interface/studentInterface';
import { Standard } from '../../interface/studentInterface';

@Component({
  selector: 'app-student-upload',
  standalone: true,
  imports: [JsonPipe, NgIf, FormsModule, CommonModule, MatLabel, MatSelect, MatOption, MatFormField, MatLabel, StudentNavigationComponent],
  templateUrl: './student-upload.component.html',
  styleUrl: './student-upload.component.scss'
})
export class StudentUploadComponent {
  excelData: any[] | undefined;
  message: string | undefined;
  errormessage: string | undefined;
  file: File | undefined;

  @ViewChild('fileinput')
  upoadinput!: ElementRef;


  selectedDivision: string | undefined;
  selectedStandard: string | undefined;
  selectedDivisionId: string = '';
  selectedStandardId: string = '';
  divisions: Division[] | undefined;
  standards: Standard[] | undefined;


  constructor(private service: StudentServiceService) { }
  ngOnInit() {
    this.GetDivisionList();
    this.GetStandardList();
  }
  onFileChange(event: any) {
    this.file = event.target.files[0];
    var filename = this.file?.name;
    var extension = filename?.split(".", 2).at(1)?.toLocaleLowerCase();
    this.errormessage = "";
    if (extension != "xlsx" && extension != "xls") {
      this.errormessage = "Please upload correct file. It should be xlsx or xls";
      this.upoadinput.nativeElement.value = "";
    }
  }

  GetDivisionList() {
    this.service.getDivisionList().subscribe(data => {
      this.divisions = data;
    })
  }
  GetStandardList() {
    this.service.getStandardList().subscribe(data => {
      this.standards = data;
    })
  }

  changeDivision(event: any) {
    this.selectedDivisionId = event.value;
  }
  changeStandard(event: any) {
    this.selectedStandardId = event.value;
  }
  uploadFiles(filesElement: HTMLInputElement) {

    if (this.file) {
      if (this.selectedDivisionId == "") {
        alert('Please select division');
        return;
      }
      if (this.selectedStandardId == "") {
        alert('Please select standard');
        return;
      }
      if (this.upoadinput.nativeElement.value == "") {
        alert('Please select file to upload');
        return;
      }
      let formData = new FormData();
      formData.append('file', this.file);
      let params = new HttpParams({ fromString: 'divisionId=' + this.selectedDivisionId + '&standadId=' + this.selectedStandardId });

      this.service.UploadStudent(formData, params).subscribe(result => {
        this.message = result.success;
        this.selectedDivision = "";
        this.selectedStandard = "";
        this.selectedDivisionId = "";
        this.selectedStandardId = "";
        this.upoadinput.nativeElement.value = "";
        // alert(result.success);
      })
    } else {
      this.errormessage = "Please select files to upload!"
    }
  }


}


