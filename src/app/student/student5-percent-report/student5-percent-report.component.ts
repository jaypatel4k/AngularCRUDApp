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
    let strError = "";
    if (utilityForm2.value.standardid == "") {
      this.setErrorMessage("Select standard");
      return;
    }
    if (utilityForm2.value.testtypeGroupA == "") {
      this.setErrorMessage("Select Group A");
      return;
    }
    if (utilityForm2.value.testtypeGroupB == "") {
      this.setErrorMessage("Select Group B");
      return;
    }
    strError = this.validateGroupSelection();
    if (strError == "")
      this.GetRankData();
  }
  validateGroupSelection() {
    let strgA = this.strTestTypeGroupA.toString();
    let strgB = this.strTestTypeGroupB.toString();
    let strError = "";
    const astrA = strgA.split(",");
    const astrB = strgB.split(",");
    for (let cnt = 0; cnt < astrA.length; cnt++) {
      if (strgB.indexOf(astrA[cnt]) >= 0) {
        //this.setErrorMessage("Group items should be diffrent in Group A and Group B");
        strError = "Group items should be diffrent in Group A and Group B";
        break;
      }
    }
    if (strError != "") {
      this.setErrorMessage(strError);
    }
    else {
      this.setErrorMessage("");

    }
    return strError;
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
    let params = new HttpParams({
      fromString: 'strGroupA=' + this.strTestTypeGroupA + '&strGroupB=' + this.strTestTypeGroupB + '&standardId=' + this.standardId
    });

    this.service.getStdent5PerecentRankList(params).subscribe(objData => {
      this.exportexcel(objData);
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

  exportexcel(objData: any[]): void {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    this.fileName = this.generateFileName();
    for (let objCnt = 0; objCnt < objData.length; objCnt++) {
      if (objCnt == 0) {
        const data = objData[0][0];

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
        for (let c = 0; c <= key.length; c++) {
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
            key[c] = aTestGroupB[1];
          if (key[c] == "unit7" && aTestGroupB.length >= 3)
            key[c] = aTestGroupB[2];
          if (key[c] == "unit8" && aTestGroupB.length >= 4)
            key[c] = aTestGroupB[3];
          if (key[c] != "" && key[c] != undefined)
            key[c] = key[c].toUpperCase().replace("_", " ").replace("5PERCENT", "5%").replace("BEST1", "BEST").replace("CW", "C.W.").replace("HW", "H.W.").replace("NAME", "NAME OF STUDENT");
        }
        aheader.push(key);

        for (let cnt = 0; cnt <= data.length - 2; cnt++) {
          this.header0 = 'INTERNAL MARKSHEET-' + this.getCurrentFiscalYear();
          //this.header3 = this.commonService.highestmarkobtainheader;
          this.header1 = aSheet[cnt].split("-")[0];
          this.header2 = aSheet[cnt].split("-")[2];
          this.header3 = aSheet[cnt].split("-")[1];
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
              sz: 10,
              color: "#000000",
              bold: true
            },
            alignment: { horizontal: 'center' }
          }
          ws['C2'].s = {
            font: {
              name: 'Calibri',
              sz: 10,
              color: "#000000",
              bold: true
            },
            alignment: { horizontal: 'center' }
          }
          ws['C3'].s = {
            font: {
              name: 'Calibri',
              sz: 10,
              color: "#000000",
              bold: true
            },
            alignment: { horizontal: 'center' }
          }
          ws['D2'].s = {
            font: {
              name: 'Calibri',
              sz: 10,
              color: "#000000",
              bold: true
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

          if (cnt <= data.length - 2)
            XLSX.utils.book_append_sheet(wb, ws, aSheet[cnt].toString()); //'Sheet' + cnt);

        }
      } // END OF First Obj IF
      if (objCnt == 1) {
        const data1 = objData[0][1];
        const aSubjects = data1[data1.length - 2].strAllSubject.split("~");
        const aFinalSheetName = data1[data1.length - 1].strFinalSheetname.split("~");
        let Heading0 = [[this.header0]];

        const key = Object.keys(data1[0][0]); // retive key from first data object

        let aheader = [];
        for (let c = 0; c < key.length; c++) {

          if (key[c] == "rollNo")
            key[c] = "Roll No";
          if (key[c] == "name")
            key[c] = "Name Of Student";
          if (key[c] == "subject1")
            key[c] = aSubjects[0];
          if (key[c] == "subject2")
            key[c] = aSubjects[1];
          if (key[c] == "subject3")
            key[c] = aSubjects[2];
          if (key[c] == "subject4")
            key[c] = aSubjects[3];
          if (key[c] == "subject5")
            key[c] = aSubjects[4];
          if (key[c] == "subject6")
            key[c] = aSubjects[5];
          if (key[c] == "subject7")
            key[c] = aSubjects[6];
          if (key[c] == "subject8")
            key[c] = aSubjects[7];
          if (key[c] == "subject9")
            key[c] = aSubjects[8];
          if (key[c] == "subject10")
            key[c] = aSubjects[9];

        }
        aheader.push(key);
        for (let cnt = 0; cnt < data1.length - 2; cnt++) {
          this.header0 = 'INTERNAL MARKSHEET-' + this.getCurrentFiscalYear();
          const asheetname = aFinalSheetName[cnt].split("-");
          this.header11 = 'STD:-' + asheetname[0] + "-" + asheetname[1].replace("FINAL", "");

          let Heading11 = [[this.header11]];
          /* pass here the table id */
          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
          /* generate workbook and add the worksheet */
          XLSX.utils.sheet_add_aoa(ws, Heading0, { origin: 'B1' });
          XLSX.utils.sheet_add_aoa(ws, Heading11, { origin: 'B2' });
          XLSX.utils.sheet_add_aoa(ws, aheader, { origin: 'A4' });

          XLSX.utils.sheet_add_json(ws, data1[cnt], { origin: 'A5', skipHeader: true });
          ws['B1'].s = {
            font: {
              name: 'Calibri',
              sz: 10,
              color: "#000000",
              bold: true
            },
            alignment: { horizontal: 'center' }
          }
          ws['B2'].s = {
            font: {
              name: 'Calibri',
              sz: 10,
              color: "#000000",
              bold: true
            },
            alignment: { horizontal: 'center' }
          }
          var wscols = [];
          var cols_width = 7; // Default cell width
          var isHidden: boolean = false;

          for (let c = 0; c < key.length; c++) {
            if (c <= aSubjects.length + 1) {
              isHidden = false;
            }
            else {
              isHidden = true;
            }
            if (c == 0) {
              wscols.push({
                wch: 7,
                hidden: isHidden
              });
            }
            if (c == 1) {
              wscols.push({
                wch: 30,
                hidden: isHidden
              });
            }
            if (c > 1) {
              wscols.push({
                wch: 8,
                hidden: isHidden
              });
            }
          }

          ws["!cols"] = wscols;

          XLSX.utils.book_append_sheet(wb, ws, aFinalSheetName[cnt] + this.getCurrentFiscalYear()); //'Sheet' + cnt);
        }
      }//END OF second OBJ if
      if (objCnt == 1)
        XLSX.writeFile(wb, this.fileName);
    }

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
function writeExcelFile(wb1: any, WorkBook: any) {
  throw new Error('Function not implemented.');
}

