import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, matSelectAnimations } from '@angular/material/select';
import { StudentNavigationComponent } from '../student-navigation/student-navigation.component';
import { HttpParams } from '@angular/common/http';
import { Division, Month, Standard, StreamType, TestHeldOfMark, TestType, Year } from '../../interface/studentInterface';
import { StudentServiceService } from '../../services/student-service.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-student-mark-uplad',
  standalone: true,
  imports: [FormsModule, CommonModule, MatLabel, MatSelect, MatOption, MatFormField, MatButton, StudentNavigationComponent],
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

  // selectedTestHeldOfMark: string | undefined;
  // selectedTestHeldOfMarkId: string = '';
  // testheldofmarks: TestHeldOfMark[] | undefined;

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
    //this.GetAllTestHeldOfMark();
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
  // GetAllTestHeldOfMark() {
  //   this.service.getAllTestHeldOfMark().subscribe(data => {
  //     this.testheldofmarks = data;
  //   })
  // }
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
  // changeTestHeldOfMark(event: any) {
  //   this.selectedTestHeldOfMarkId = event.value;
  // }
  changeStreamType(event: any) {
    this.selectedStreamTypeId = event.value;
  }
  uploadFiles(filesElement: HTMLInputElement) {

    if (this.file) {
      if (this.selectedTestTypeId == "") {
        this.setErrorMessage('Please select TestType');
        return;
      }
      if (this.selectedDivisionId == "") {
        this.setErrorMessage('Please select division');
        return;
      }
      if (this.selectedStandardId == "") {
        this.setErrorMessage('Please select Standard');
        return;
      }
      if (this.selectedYearId == "") {
        this.setErrorMessage('Please select Year');
        return;
      }
      if (this.selectedMonthId == "") {
        this.setErrorMessage('Please select Month');
        return;
      }

      // if (this.selectedTestHeldOfMarkId == "") {
      //   this.setErrorMessage('Please select Test Held Of Mark');
      //   return;
      // }
      if (this.selectedStreamTypeId == "") {
        this.setErrorMessage('Please select StreamType');
        return;
      }
      if (this.upoadinput.nativeElement.value == "") {
        this.setErrorMessage('Please select file to upload');
        return;
      }
      let formData = new FormData();
      formData.append('TestTypeId', this.selectedTestTypeId);
      formData.append('DivisionId', this.selectedDivisionId);
      formData.append('StandardId', this.selectedStandardId);
      formData.append('YearId', this.selectedYearId);
      formData.append('MonthId', this.selectedMonthId);
      formData.append('StreamId', this.selectedStreamTypeId);
      formData.append('file', this.file);

      // let params = new HttpParams({
      //   fromString: 'testTypeId=' + this.selectedTestTypeId +
      //     '&monthId=' + this.selectedMonthId +
      //     '&yearId=' + this.selectedYearId +
      //     '&divisionId=' + this.selectedDivisionId +
      //     '&standardId=' + this.selectedStandardId +
      //     '&streamId=' + this.selectedStreamTypeId
      //   // '&testHeldOfMarkId=' + this.selectedTestHeldOfMarkId
      // });
      //this.service.UploadStudentMarks(formData, params).subscribe(result => {
      this.service.UploadStudentMarks(formData).subscribe({
        // result => {
        //   this.message = result.success;
        //   this.upoadinput.nativeElement.value = "";
        // },
        // error => {
        //   console.log(error.message);
        // }
        next: (res) => {
          this.message = res.success;
          this.upoadinput.nativeElement.value = "";
        },
        error: (e) => {
          this.setErrorMessage(e.error);
        }

      })
    } else {
      this.setErrorMessage('Please select file to upload');
    }
  }
  setErrorMessage(strmessage: string) {
    this.errormessage = strmessage;
  }

}

