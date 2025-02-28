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
  strTestTypeGroupA: string = '8,9';

  constructor(private service: StudentServiceService) { }
  ngOnInit() {
    this.GetTestTypeList();
    this.GetStandardList();
  }

  onClick(utilityForm2: any) {
    alert(utilityForm2.value.testtype)
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

    let params = new HttpParams({
      fromString: 'strGroupA=' + this.strTestTypeGroupA
    });

    this.service.getStdent5PerecentRankList(params).subscribe(data => {

      console.log(data[0]);
    });
  }


  setErrorMessage(strmessage: string) {
    this.errormessage = strmessage;
  }
}
