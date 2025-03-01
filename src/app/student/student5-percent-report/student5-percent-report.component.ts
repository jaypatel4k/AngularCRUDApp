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
  header11 = '';
  header2 = '';
  header22 = '';
  header3 = '';
  header33 = '';
  strdivision = '';

  exportexcel(data: any): void {
    this.fileName = this.generateFileName();
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    let strSheet: string = '';
    let strTestTypes: string = '';


    strSheet = data[data.length - 1][0].sheetsNames;
    const aSheet = strSheet.split("~");

    strTestTypes = data[data.length - 1][0].typeNames;
    const aTestTypes = strTestTypes?.split("~");
    let strTestTypesA = aTestTypes[0].toString();
    let strTestTypesB = aTestTypes[1].toString();
    this.strdivision = aTestTypes[2].toString();
    const aTestGroupA = strTestTypesA?.split("_");
    const aTestGroupB = strTestTypesB?.split("_");
    this.fileName = this.generateFileName();

    const key = Object.keys(data[0][0]); // retive key from first data object
    let aheader = [];
    for (let c = 0; c < key.length; c++) {
      if (c <= 1)
        key[c] = "";
      if (key[c] == "unit1" && aTestGroupA.length >= 1)
        key[c] = aTestGroupA[0];
      if (key[c] == "unit2" && aTestGroupA.length >= 2)
        key[c] = aTestGroupA[1];
      if (key[c] == "unit3" && aTestGroupA.length >= 3)
        key[c] = aTestGroupA[2];
      if (key[c] == "unit4" && aTestGroupA.length >= 4)
        key[c] = aTestGroupA[3];

      if (key[c] == "unit5" && aTestGroupB.length >= 1)
        key[c] = aTestGroupB[0];
      if (key[c] == "unit6" && aTestGroupB.length >= 2)
        key[c] = aTestGroupA[1];
      if (key[c] == "unit7" && aTestGroupB.length >= 3)
        key[c] = aTestGroupA[2];
      if (key[c] == "unit8" && aTestGroupB.length >= 4)
        key[c] = aTestGroupA[3];

      key[c] = key[c].toUpperCase().replace("_", " ").replace("5PERCENT", "5%").replace("BEST1", "BEST").replace("CW", "C.W.").replace("HW", "H.W.").replace("NAME", "NAME OF STUDENT");
    }
    aheader.push(key);

    for (let cnt = 0; cnt <= data.length - 2; cnt++) {
      this.header0 = 'INTERNAL MARKSHEET-' + this.getCurrentFiscalYear();
      //this.header3 = this.commonService.highestmarkobtainheader;
      this.header1 = aSheet[0].split("-")[0];
      this.header2 = aSheet[0].split("-")[2];
      this.header3 = aSheet[0].split("-")[1];
      this.header11 = 'CLASS';
      this.header22 = 'SUBJECT';
      this.header33 = 'DIV.';

      let Heading0 = [[this.header0]];
      let Heading1 = [[this.header1]];
      let Heading11 = [[this.header11]];
      let Heading2 = [[this.header2]];
      let Heading22 = [[this.header22]];
      let Heading3 = [[this.header3]];
      let Heading33 = [[this.header33]];

      // const merge = [
      //   { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } },
      //   { s: { r: 1, c: 0 }, e: { r: 1, c: 4 } },
      //   { s: { r: 2, c: 0 }, e: { r: 2, c: 4 } },
      //   { s: { r: 11, c: 0 }, e: { r: 11, c: 5 } },
      // ];
      const merge = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }
        // { s: { r: 1, c: 3 }, e: { r: 1, c: 4 } }
      ];



      /* pass here the table id */
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
      /* generate workbook and add the worksheet */
      //const wb: XLSX.WorkBook = XLSX.utils.book_new();



      XLSX.utils.sheet_add_aoa(ws, Heading0, { origin: 'A1' });
      XLSX.utils.sheet_add_aoa(ws, Heading11, { origin: 'C2' });
      XLSX.utils.sheet_add_aoa(ws, Heading1, { origin: 'D2' });
      XLSX.utils.sheet_add_aoa(ws, Heading22, { origin: 'C3' });
      XLSX.utils.sheet_add_aoa(ws, Heading2, { origin: 'D3' });
      XLSX.utils.sheet_add_aoa(ws, Heading33, { origin: 'E2' });
      XLSX.utils.sheet_add_aoa(ws, Heading3, { origin: 'F2' });
      XLSX.utils.sheet_add_aoa(ws, aheader, { origin: 'A4' });
      //Starting in the second row to avoid overriding and skipping headers
      XLSX.utils.sheet_add_json(ws, data[cnt], { origin: 'A5', skipHeader: true });


      ws['A1'].s = {
        font: {
          name: 'Calibri',
          sz: 12,
          color: "#000000"
        },
        alignment: { horizontal: 'center' }
      }
      ws['C2'].s = {
        font: {
          name: 'Calibri',
          sz: 12,
          color: "#000000"
        },
        alignment: { horizontal: 'center' }
      }
      ws['C3'].s = {
        font: {
          name: 'Calibri',
          sz: 12,
          color: "#000000"
        },
        alignment: { horizontal: 'center' }
      }
      ws['D2'].s = {
        font: {
          name: 'Calibri',
          sz: 12,
          color: "#000000"
        },
        alignment: { horizontal: 'center' }
      }

      ws['D3'].s = {
        font: {
          name: 'Calibri',
          sz: 12,
          color: "#000000"
        },
        alignment: { horizontal: 'center' }
      }
      ws['B4'].s = {
        font: {
          name: 'Calibri',
          sz: 12,
          color: "#000000"
        },
        alignment: { horizontal: 'center' }
      }


      var wscols = [];
      var cols_width = 7; // Default cell width
      wscols.push({
        wch: 1
      });
      wscols.push({
        wch: 1
      });
      wscols.push({
        wch: 7
      });
      wscols.push({
        wch: 30
      });
      wscols.push({
        wch: cols_width
      });
      wscols.push({
        wch: cols_width
      });
      wscols.push({
        wch: cols_width
      });
      wscols.push({
        wch: cols_width
      });
      wscols.push({
        wch: cols_width
      });
      wscols.push({
        wch: cols_width
      });
      wscols.push({
        wch: cols_width
      });
      wscols.push({
        wch: cols_width
      });
      wscols.push({
        wch: cols_width
      });
      wscols.push({
        wch: cols_width
      });
      wscols.push({
        wch: cols_width
      });
      wscols.push({
        wch: cols_width
      });
      wscols.push({
        wch: cols_width
      });

      ws["!cols"] = wscols;
      ws["!merges"] = merge;

      XLSX.utils.book_append_sheet(wb, ws, aSheet[cnt].toString()); //'Sheet' + cnt);
      if (cnt == data.length - 2) {

        XLSX.writeFile(wb, this.fileName);
      }

    }


    //XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */

  }
  generateFileName() {
    //9-A-B-C-5% INTERNAL MARKSHEET-2024-25
    let stryear: string = '';
    stryear = this.getCurrentFiscalYear();
    return this.strdivision + '-5%' + '-' + 'INTERNAL MARKSHEET-' + stryear + '.xlsx';
  }


  getCurrentFiscalYear() {
    //get current date
    var today = new Date();

    //get current month
    var curMonth = today.getMonth();

    var fiscalYr = "";
    if (curMonth > 3) { //
      var nextYr1 = (today.getFullYear() + 1).toString();
      fiscalYr = today.getFullYear().toString() + "-" + nextYr1.charAt(2) + nextYr1.charAt(3);
    } else {
      var nextYr2 = today.getFullYear().toString();
      fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2.charAt(2) + nextYr2.charAt(3);
    }
    return fiscalYr;
  }

}
