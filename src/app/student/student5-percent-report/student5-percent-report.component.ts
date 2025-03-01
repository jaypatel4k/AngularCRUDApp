import { Component } from '@angular/core';
import { StudentServiceService } from '../../services/student-service.service';
import { Standard, TestType } from '../../interface/studentInterface';
import { StudentNavigationComponent } from "../student-navigation/student-navigation.component";
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { HttpParams } from '@angular/common/http';
import { CommonserviceService } from '../../services/commonservice.service';
import * as XLSX from 'xlsx-js-style';

@Component({
  selector: 'app-student5-percent-report',
  imports: [StudentNavigationComponent, FormsModule, MatLabel, MatFormField, MatOption, MatFormFieldModule, MatSelectModule, MatButton],
  templateUrl: './student5-percent-report.component.html',
  styleUrl: './student5-percent-report.component.scss'
})
export class Student5PercentReportComponent {
  message: string | undefined;
  errormessage: string | undefined;
  testtypes: TestType[] | undefined;
  standards: Standard[] | undefined;
  strTestTypeGroupA: string = '';
  strTestTypeGroupB: string = '';
  standardId: number = 0;

  constructor(private service: StudentServiceService, private commonService: CommonserviceService) { }
  ngOnInit() {
    this.GetTestTypeList();
    this.GetStandardList();
  }

  onClick(utilityForm2: any) {
    this.strTestTypeGroupA = utilityForm2.value.testtypeGroupA;
    this.strTestTypeGroupB = utilityForm2.value.testtypeGroupB;
    this.standardId = utilityForm2.value.standardid;
    this.GetRankData();
  }

  GetTestTypeList() {
    this.service.getTestTypeList().subscribe(data => {
      this.testtypes = data;
    })
  }
  GetStandardList() {
    this.service.getStandardList().subscribe(data => {
      this.standards = data;
    })
  }
  GetRankData() {
    // console.log(testtypeGroupA);
    let params = new HttpParams({
      fromString: 'strGroupA=' + this.strTestTypeGroupA + '&strGroupB=' + this.strTestTypeGroupB + '&standardId=' + this.standardId
    });

    this.service.getStdent5PerecentRankList(params).subscribe(data => {
      //if (this.reportDownload == true) {
      this.exportexcel(data);
      //}
    });
  }


  setErrorMessage(strmessage: string) {
    this.errormessage = strmessage;
  }

  fileName = '';
  header0 = '';
  header1 = '';
  header2 = '';
  header3 = '';

  exportexcel(data: any): void {
    this.fileName = this.generateFileName();
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    for (let cnt = 0; cnt <= data.length - 2; cnt++) {
      this.header0 = this.commonService.schoolnameheading;
      //this.header3 = this.commonService.highestmarkobtainheader;

      let Heading0 = [[this.header0]];
      let Heading1 = [[this.header1]];
      let Heading2 = [[this.header2]];
      // let Heading3 = [[this.header3]];

      let topRank = [['ROLL NO.', 'NAME', 'RANK', 'TOTAL']];
      let topSubjectRank = [['ROLL NO.', 'NAME', 'SUBJECT', 'MARKS']];

      // const merge = [
      //   { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } },
      //   { s: { r: 1, c: 0 }, e: { r: 1, c: 4 } },
      //   { s: { r: 2, c: 0 }, e: { r: 2, c: 4 } },
      //   { s: { r: 11, c: 0 }, e: { r: 11, c: 5 } },
      // ];
      const merge = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }
      ];



      /* pass here the table id */
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
      /* generate workbook and add the worksheet */
      //const wb: XLSX.WorkBook = XLSX.utils.book_new();



      XLSX.utils.sheet_add_aoa(ws, Heading0, { origin: 'A1' });
      XLSX.utils.sheet_add_aoa(ws, Heading1, { origin: 'A2' });
      XLSX.utils.sheet_add_aoa(ws, Heading2, { origin: 'A3' });
      // XLSX.utils.sheet_add_aoa(ws, topRank, { origin: 'A4' });
      //Starting in the second row to avoid overriding and skipping headers
      XLSX.utils.sheet_add_json(ws, data[cnt], { origin: 'A5', skipHeader: false });

      // XLSX.utils.sheet_add_aoa(ws, Heading3, { origin: 'A12' });
      // XLSX.utils.sheet_add_aoa(ws, topSubjectRank, { origin: 'A13' });
      // XLSX.utils.sheet_add_json(ws, data1, { origin: 'A14', skipHeader: true });

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

      XLSX.utils.book_append_sheet(wb, ws, 'Sheet' + cnt);
      if (cnt == data.length - 2)
        XLSX.writeFile(wb, this.fileName);
    }


    //XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */

  }
  generateFileName() {
    //9-A-B-C-5% INTERNAL MARKSHEET-2024-25
    this.header1 = '9-A-B-C-5%'
    this.header2 = 'INTERNAL MARKSHEET-2024-25';

    return this.header1 + '-' + this.header2 + '.xlsx';
  }

}
