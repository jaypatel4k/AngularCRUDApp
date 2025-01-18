import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, matSelectAnimations } from '@angular/material/select';
import { StudentNavigationComponent } from '../student-navigation/student-navigation.component';
import { HttpParams } from '@angular/common/http';
import { Division, Month, Standard, StreamType, TestHeldOfMark, TestType, Year } from '../../interface/studentInterface';
import { StudentServiceService } from '../../services/student-service.service';

@Component({
  selector: 'app-student-mark-uplad',
  standalone: true,
  imports: [JsonPipe, NgIf, FormsModule, CommonModule, MatLabel, MatSelect, MatOption, MatFormField, MatLabel, StudentNavigationComponent],
  templateUrl: './student-mark-uplad.component.html',
  styleUrl: './student-mark-uplad.component.scss'
})
export class StudentMarkUpladComponent {
  excelData: any[] | undefined;
  message: string | undefined;
  errormessage: string | undefined;
  file: File | undefined;

  @ViewChild('fileinput')
  upoadinput!: ElementRef;


  selectedDivision: string | undefined;
  selectedDivisionId: string = '';
  divisions: Division[] | undefined;

  selectedStandard: string | undefined;
  selectedStandardId: string = '';
  standards: Standard[] | undefined;

  selectedTestType: string | undefined;
  selectedTestTypeId: string = '';
  testtypes: TestType[] | undefined;

  selectedMonth: string | undefined;
  selectedMonthId: string = '';
  months: Month[] | undefined;

  selectedYear: string | undefined;
  selectedYearId: string = '';
  years: Year[] | undefined;

  selectedTestHeldOfMark: string | undefined;
  selectedTestHeldOfMarkId: string = '';
  testheldofmarks: TestHeldOfMark[] | undefined;

  selectedStreamType: string | undefined;
  selectedStreamTypeId: string = '';
  streamtypes: StreamType[] | undefined;

  constructor(private service: StudentServiceService) { }
  ngOnInit() {
    this.GetDivisionList();
    this.GetStandardList();
    this.GetMonth();
    this.GetYear();
    this.GetTestTypeList();
    this.GetAllTestHeldOfMark();
    this.GetStreamType();
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
  GetTestTypeList() {
    this.service.getTestTypeList().subscribe(data => {
      this.testtypes = data;
    })
  }
  GetMonth() {
    this.service.getMonth().subscribe(data => {
      this.months = data;
    })
  }
  GetYear() {
    this.service.getYear().subscribe(data => {
      this.years = data;
    })
  }
  GetAllTestHeldOfMark() {
    this.service.getAllTestHeldOfMark().subscribe(data => {
      this.testheldofmarks = data;
    })
  }
  GetStreamType() {
    this.service.getStreamTypes().subscribe(data => {
      this.streamtypes = data;
    })
  }


  changeDivision(event: any) {
    this.selectedDivisionId = event.value;
  }
  changeStandard(event: any) {
    this.selectedStandardId = event.value;
  }
  changeTestType(event: any) {
    this.selectedTestTypeId = event.value;
  }
  changeMonth(event: any) {
    this.selectedMonthId = event.value;
  }
  changeYear(event: any) {
    this.selectedYearId = event.value;
  }
  changeTestHeldOfMark(event: any) {
    this.selectedTestHeldOfMarkId = event.value;
  }
  changeStreamType(event: any) {
    this.selectedStreamTypeId = event.value;
  }
  uploadFiles(filesElement: HTMLInputElement) {

    if (this.file) {
      if (this.selectedDivisionId == "") {
        alert('Please select division');
        return;
      }

      if (this.selectedTestTypeId == "") {
        alert('Please select TestType');
        return;
      }
      if (this.selectedMonthId == "") {
        alert('Please select Month');
        return;
      }
      if (this.selectedYearId == "") {
        alert('Please select Year');
        return;
      }
      if (this.selectedTestHeldOfMarkId == "") {
        alert('Please select Test Held Of Mark');
        return;
      }
      if (this.selectedStreamTypeId == "") {
        alert('Please select StreamType');
        return;
      }
      if (this.upoadinput.nativeElement.value == "") {
        alert('Please select file to upload');
        return;
      }
      let formData = new FormData();
      formData.append('file', this.file);
      let params = new HttpParams({
        fromString: 'testTypeId=' + this.selectedTestTypeId +
          '&monthId=' + this.selectedMonthId +
          '&yearId=' + this.selectedYearId +
          '&divisionId=' + this.selectedDivisionId +
          '&standardId=' + this.selectedStandardId +
          '&streamId=' + this.selectedStreamTypeId +
          '&testHeldOfMarkId=' + this.selectedTestHeldOfMarkId
      });
      this.service.UploadStudentMarks(formData, params).subscribe(result => {
        this.message = result.success;
        this.selectedDivision = "";
        this.selectedDivisionId = "";
        this.selectedStandard = "";
        this.selectedStandardId = "";
        this.selectedTestType = "";
        this.selectedTestTypeId = "";
        this.selectedMonth = "";
        this.selectedMonthId = "";
        this.selectedYear = "";
        this.selectedYearId = "";
        this.selectedTestHeldOfMark = "";
        this.selectedTestHeldOfMarkId = "";
        this.selectedStreamType = "";
        this.selectedStreamTypeId = "";
        this.upoadinput.nativeElement.value = "";

      })
    } else {
      this.errormessage = "Please select files to upload!"
    }
  }


}

