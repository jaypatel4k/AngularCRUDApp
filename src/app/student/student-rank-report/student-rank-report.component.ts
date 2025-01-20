import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { StudentNavigationComponent } from '../student-navigation/student-navigation.component';
import { Division, Month, Standard, StreamType, TestHeldOfMark, TestType, Year } from '../../interface/studentInterface';
import { StudentServiceService } from '../../services/student-service.service';
import { HttpParams } from '@angular/common/http';
import { MatButton } from '@angular/material/button';
import { AllCommunityModule, ColDef, GridApi, GridReadyEvent, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import * as XLSX from 'xlsx';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-student-rank-report',
  imports: [FormsModule, CommonModule, MatLabel, MatSelect, MatOption, MatFormField, MatButton, StudentNavigationComponent, AgGridAngular],
  templateUrl: './student-rank-report.component.html',
  styleUrl: './student-rank-report.component.scss'
})
export class StudentRankReportComponent {
  StudentTopThreeRankList: any[] | undefined;
  private gridApi!: GridApi;

  strTestType: string | undefined;
  strMonth: string | undefined;
  strYear: string | undefined;
  strStandard: string | undefined;
  strDivision: string | undefined;
  strStreamType: string | undefined;
  //UNIT TEST-DECEMBER-2024-STD-XI-B-SCIENCE


  message: string | undefined;
  errormessage: string | undefined;

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
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "name", resizable: false },
    { field: "rollNo" },
    { field: "totalMarks" },
    { field: "rank" }
  ];

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
    this.strDivision = event.source.triggerValue;
    //console.log(event.source.triggerValue);
  }
  changeStandard(event: any) {
    this.selectedStandardId = event.value;
    this.strStandard = event.source.triggerValue;
  }
  changeTestType(event: any) {
    this.selectedTestTypeId = event.value;
    this.strTestType = event.source.triggerValue;
  }
  changeMonth(event: any) {
    this.selectedMonthId = event.value;
    this.strMonth = event.source.triggerValue;
  }
  changeYear(event: any) {
    this.selectedYearId = event.value;
    this.strYear = event.source.triggerValue;
  }
  changeTestHeldOfMark(event: any) {
    this.selectedTestHeldOfMarkId = event.value;
  }
  changeStreamType(event: any) {
    this.selectedStreamTypeId = event.value;
    this.strStreamType = event.source.triggerValue;
  }
  fetchData() {

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

    if (this.selectedTestHeldOfMarkId == "") {
      this.setErrorMessage('Please select Test Held Of Mark');
      return;
    }
    if (this.selectedStreamTypeId == "") {
      this.setErrorMessage('Please select StreamType');
      return;
    }

    let params = new HttpParams({
      fromString: 'testTypeId=' + this.selectedTestTypeId +
        '&monthId=' + this.selectedMonthId +
        '&yearId=' + this.selectedYearId +
        '&divisionId=' + this.selectedDivisionId +
        '&standardId=' + this.selectedStandardId +
        '&streamId=' + this.selectedStreamTypeId +
        '&testHeldOfMarkId=' + this.selectedTestHeldOfMarkId
    });

    this.service.getStdentTopThreeRankList(params).subscribe(data => {
      this.StudentTopThreeRankList = data;
      this.exportexcel(data);
    })
  }
  setErrorMessage(strmessage: string) {
    this.errormessage = strmessage;
  }
  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
  }
  onBtExport() {
    this.gridApi.exportDataAsExcel();
  }

  title = 'Top Rank';
  fileName = '';
  header1 = '';
  header2 = '';

  exportexcel(data: any): void {
    this.fileName = this.generateFileName();
    //console.log(this.fileName);
    let Heading1 = [[this.header1, '', '']];
    let Heading2 = [[this.header2, '', '']];

    /* pass here the table id */
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.sheet_add_aoa(ws, Heading1);
    XLSX.utils.sheet_add_aoa(ws, Heading2, { origin: 'A2' });
    //Starting in the second row to avoid overriding and skipping headers
    XLSX.utils.sheet_add_json(ws, data, { origin: 'A3', skipHeader: false });

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
  generateFileName() {
    ////UNIT TEST-DECEMBER-2024-STD-XI-B-SCIENCE
    this.header1 = this.strTestType + '-' + this.strMonth + '-'
      + this.strYear;
    this.header2 = 'STD-' + this.strStandard + '-' + this.strDivision + '-' + this.strStreamType;

    return this.header1 + '-' + this.header2 + '.xlsx';


  }
}




