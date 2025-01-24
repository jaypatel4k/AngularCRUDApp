import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { Component, ElementRef, model, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { StudentNavigationComponent } from '../student-navigation/student-navigation.component';
import { Division, Month, Standard, StreamType, TestHeldOfMark, TestType, Year } from '../../interface/studentInterface';
import { StudentServiceService } from '../../services/student-service.service';
import { HttpParams } from '@angular/common/http';
import { MatButton } from '@angular/material/button';
import { AllCommunityModule, ColDef, GridApi, GridReadyEvent, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import * as XLSX from 'xlsx-js-style';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { CommonserviceService } from '../../services/commonservice.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-student-rank-report',
  standalone: true,
  imports: [FormsModule, CommonModule, MatLabel, MatSelect, MatOption, MatFormField, MatButton, MatCheckbox, StudentNavigationComponent, AgGridAngular],
  templateUrl: './student-rank-report.component.html',
  styleUrl: './student-rank-report.component.scss'
})
export class StudentRankReportComponent {

  StudentTopThreeRankList: any[] | undefined;
  StudentTopSubjectRankList: any[] | undefined;
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

  selectedStreamType: string | undefined;
  selectedStreamTypeId: string = '';
  streamtypes: StreamType[] | undefined;
  reportDownload: boolean | undefined;

  constructor(private service: StudentServiceService, private commonService: CommonserviceService) { }
  ngOnInit() {
    this.GetDivisionList();
    this.GetStandardList();
    this.GetMonth();
    this.GetYear();
    this.GetTestTypeList();
    this.GetStreamType();
    this.reportDownload = true;
  }
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "rollNo" },
    { field: "name", resizable: false },
    { field: "rank" },
    { field: "totalMarks" }

  ];
  colSubjectDefs: ColDef[] = [
    { field: "rollNo" },
    { field: "name", resizable: false },
    { field: "subjectName" },
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
  GetStreamType() {
    this.service.getStreamTypes().subscribe(data => {
      this.streamtypes = data;
    })
  }

  changeDivision(event: any) {
    this.selectedDivisionId = event.value;
    this.strDivision = event.source.triggerValue;
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
        '&streamId=' + this.selectedStreamTypeId
    });

    this.service.getStdentTopThreeRankAndSubjectRankList(params).subscribe(data => {
      this.StudentTopThreeRankList = data[0];
      this.StudentTopSubjectRankList = data[1];
      if (this.reportDownload == true) {
        this.exportexcel(data[0], data[1]);
      }

    })
  }
  setErrorMessage(strmessage: string) {
    this.errormessage = strmessage;
  }

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
  }

  fileName = '';
  header0 = '';
  header1 = '';
  header2 = '';
  header3 = '';

  exportexcel(data: any, data1: any): void {
    this.fileName = this.generateFileName();

    this.header0 = this.commonService.schoolnameheading;
    this.header3 = this.commonService.highestmarkobtainheader;

    let Heading0 = [[this.header0]];
    let Heading1 = [[this.header1]];
    let Heading2 = [[this.header2]];
    let Heading3 = [[this.header3]];

    let topRank = [['ROLL NO.', 'NAME', 'RANK', 'TOTAL']];
    let topSubjectRank = [['ROLL NO.', 'NAME', 'SUBJECT', 'MARKS', 'RANK']];

    const merge = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 4 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 4 } },
      { s: { r: 11, c: 0 }, e: { r: 11, c: 5 } },
    ];



    /* pass here the table id */
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();



    XLSX.utils.sheet_add_aoa(ws, Heading0, { origin: 'A1' });
    XLSX.utils.sheet_add_aoa(ws, Heading1, { origin: 'A2' });
    XLSX.utils.sheet_add_aoa(ws, Heading2, { origin: 'A3' });
    XLSX.utils.sheet_add_aoa(ws, topRank, { origin: 'A4' });
    //Starting in the second row to avoid overriding and skipping headers
    XLSX.utils.sheet_add_json(ws, data, { origin: 'A5', skipHeader: true });

    XLSX.utils.sheet_add_aoa(ws, Heading3, { origin: 'A12' });
    XLSX.utils.sheet_add_aoa(ws, topSubjectRank, { origin: 'A13' });
    XLSX.utils.sheet_add_json(ws, data1, { origin: 'A14', skipHeader: true });

    ws['A1'].s = {
      font: {
        name: 'Times New Roman',
        sz: 14,
        bold: true,
        color: "#000000"
      },
      alignment: { horizontal: 'center' }
    }
    ws['A2'].s = {
      font: {
        name: 'Times New Roman',
        sz: 12,
        bold: true,
        color: { rgb: "1a75ff" },
      },
      alignment: { horizontal: 'center' }
    }
    ws['A3'].s = {
      font: {
        name: 'Times New Roman',
        sz: 12,
        bold: true,
        color: "#000000"
      },
      alignment: { horizontal: 'center' }
    }

    ws['A12'].s = {
      font: {
        name: 'Times New Roman',
        sz: 12,
        bold: true,
        color: "#000000"
      },
      alignment: { horizontal: 'center' }
    }
    var wscols = [];
    var cols_width = 16; // Default cell width
    wscols.push({
      wch: 10
    });
    wscols.push({
      wch: 40
    });
    wscols.push({
      wch: 10
    });
    wscols.push({
      wch: 10
    });
    ws["!cols"] = wscols;
    ws["!merges"] = merge;


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




