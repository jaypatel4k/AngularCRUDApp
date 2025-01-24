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
  selector: 'app-student-overall-rank-report',
  imports: [FormsModule, CommonModule, MatLabel, MatSelect, MatOption, MatFormField, MatButton, MatCheckbox, StudentNavigationComponent, AgGridAngular],
  templateUrl: './student-overall-rank-report.component.html',
  styleUrl: './student-overall-rank-report.component.scss'
})
export class StudentOverallRankReportComponent {

  StudentTopThreeRankList: any[] | undefined;
  StudentTopSubjectRankList: any[] | undefined;
  FirstSecondThridRankList: any[] | undefined;
  HighestInAllSubjectAndAllDiv: any[] | undefined;
  private gridApi!: GridApi;

  strTestType: string | undefined;
  strMonth: string | undefined;
  strYear: string | undefined;
  strStandard: string | undefined;
  strStreamType: string | undefined;
  //UNIT TEST-DECEMBER-2024-STD-XI-B-SCIENCE

  strAllDivision: string = '';
  message: string | undefined;
  errormessage: string | undefined;

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
  test: any;

  constructor(private service: StudentServiceService, private commonService: CommonserviceService) { }
  ngOnInit() {
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
    { field: "name" },
    { field: "div" },
    { field: "rank" },
    { field: "total" }

  ];
  colSubjectDefs: ColDef[] = [
    { field: "rollNo" },
    { field: "name" },
    { field: "div" },
    { field: "subject" },
    { field: "marks" }
  ];

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
        '&standardId=' + this.selectedStandardId +
        '&streamId=' + this.selectedStreamTypeId
    });

    this.service.getStdentTopThreeRankAndSubjectRankInAllDivisionList(params).subscribe(data => {
      this.StudentTopThreeRankList = data[0];
      this.StudentTopSubjectRankList = data[1];
      this.FirstSecondThridRankList = data[2];
      this.HighestInAllSubjectAndAllDiv = data[3];

      data[1].forEach((e: { div: any; }) => {
        if (this.strAllDivision.indexOf(e.div) == -1)
          this.strAllDivision = this.strAllDivision.concat(e.div + '/');
      })
      this.strAllDivision = this.strAllDivision.substring(0, this.strAllDivision.length - 1);
      if (this.reportDownload == true) {
        this.exportexcel(data[0], data[1], data[2], data[3]);
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

  title = 'Top Rank';
  fileName = '';
  header1 = '';
  header2 = '';
  header3 = '';
  header0 = '';

  exportexcel(data: any, data1: any, data2: any, data3: any): void {
    this.fileName = this.generateFileName();
    //console.log(this.fileName);
    this.header0 = this.commonService.schoolnameheading;
    this.header3 = this.commonService.highestmarkobtainheader;
    let Heading0 = [[this.header0]];
    let Heading1 = [[this.header1]];
    let Heading2 = [[this.header2]];
    let Heading3 = [[this.header3]];
    let Heading4 = [[this.commonService.firstsecondthridheading]];
    let Heading5 = [[this.commonService.highestinalldivisionheading]];
    let Heading6 = [[this.commonService.congatesheading]];

    let topRank = [['ROLL NO.', 'NAME', 'DIV.', 'RANK', 'TOTAL']];
    let topSubjectRank = [['ROLL NO.', 'NAME', 'DIV.', 'SUBJECT', 'MARKS']];

    const merge = [
      { s: { r: 2, c: 1 }, e: { r: 2, c: 5 } },
      { s: { r: 3, c: 1 }, e: { r: 3, c: 5 } },
      { s: { r: 4, c: 1 }, e: { r: 4, c: 5 } },
      { s: { r: 6, c: 1 }, e: { r: 7, c: 5 } },
      { s: { r: 16, c: 1 }, e: { r: 16, c: 5 } },
      { s: { r: 2, c: 7 }, e: { r: 2, c: 11 } },
      { s: { r: 22, c: 7 }, e: { r: 22, c: 11 } },
    ];

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();


    XLSX.utils.sheet_add_aoa(ws, Heading0, { origin: 'B3' });
    XLSX.utils.sheet_add_aoa(ws, Heading1, { origin: 'B4' });
    XLSX.utils.sheet_add_aoa(ws, Heading2, { origin: 'B5' });
    XLSX.utils.sheet_add_aoa(ws, Heading6, { origin: 'B7' });
    XLSX.utils.sheet_add_aoa(ws, topRank, { origin: 'B9' });
    XLSX.utils.sheet_add_json(ws, data, { origin: 'B10', skipHeader: true });

    XLSX.utils.sheet_add_aoa(ws, Heading3, { origin: 'B17' });
    XLSX.utils.sheet_add_aoa(ws, topSubjectRank, { origin: 'B18' });
    XLSX.utils.sheet_add_json(ws, data1, { origin: 'B19', skipHeader: true });

    XLSX.utils.sheet_add_aoa(ws, Heading4, { origin: 'H3' });
    XLSX.utils.sheet_add_aoa(ws, topRank, { origin: 'H4' });
    XLSX.utils.sheet_add_json(ws, data2, { origin: 'H5', skipHeader: true });


    XLSX.utils.sheet_add_aoa(ws, Heading5, { origin: 'H23' });
    XLSX.utils.sheet_add_aoa(ws, topSubjectRank, { origin: 'H24' });
    XLSX.utils.sheet_add_json(ws, data3, { origin: 'H25', skipHeader: true });

    ws['B3'].s = {
      font: {
        name: 'Times New Roman',
        sz: 14,
        bold: true,
        color: "#000000"
      },
      alignment: { horizontal: 'center' }
    }
    ws['B4'].s = {
      font: {
        name: 'Times New Roman',
        sz: 12,
        bold: true,
        color: { rgb: "1a75ff" },
      },
      alignment: { horizontal: 'center' }
    }
    ws['B5'].s = {
      font: {
        name: 'Times New Roman',
        sz: 12,
        bold: true,
        color: "#000000"
      },
      alignment: { horizontal: 'center' }
    }

    ws['B7'].s = {
      font: {
        name: 'Times New Roman',
        sz: 24,
        bold: true,
        color: "#000000"
      },
      alignment: { horizontal: 'center' }
    }
    ws['B17'].s = {
      font: {
        name: 'Times New Roman',
        sz: 10,
        bold: true,
        color: "#000000"
      },
      alignment: { horizontal: 'center' }
    }
    ws['H3'].s = {
      font: {
        name: 'Times New Roman',
        sz: 14,
        bold: true,
        color: "#000000"
      },
      alignment: { horizontal: 'center' }
    }
    ws['H23'].s = {
      font: {
        name: 'Times New Roman',
        sz: 14,
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
      wch: 10
    });
    wscols.push({
      wch: 40
    });
    wscols.push({
      wch: 14
    });
    wscols.push({
      wch: 14
    });
    wscols.push({
      wch: 14
    });
    wscols.push({
      wch: 10
    });
    wscols.push({
      wch: 10
    });
    wscols.push({
      wch: 40
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
    this.header2 = 'STD-' + this.strStandard + '-' + this.strStreamType + '(' + this.strAllDivision + ')';

    return this.header1 + '-' + this.header2 + '.xlsx';


  }
}





