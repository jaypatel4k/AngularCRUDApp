import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ColDef, GridReadyEvent, ModuleRegistry } from 'ag-grid-community';
import { StudentServiceService } from '../../services/student-service.service';
import { StudentNavigationComponent } from '../student-navigation/student-navigation.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { HttpParams } from '@angular/common/http';
import { MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { Division } from '../../interface/studentInterface';
import { Standard } from '../../interface/studentInterface';

ModuleRegistry.registerModules([AllCommunityModule]);


@Component({
  selector: 'app-show-student',
  standalone: true,
  imports: [CommonModule, FormsModule, StudentNavigationComponent, MatFormField, MatLabel, MatButton, MatOption, MatSelect, AgGridAngular],
  templateUrl: './show-student.component.html',
  styleUrl: './show-student.component.scss'
})
export class ShowStudentComponent {
  excelData: any[] | undefined;
  message: string | undefined;
  errormessage: string | undefined;
  selectedDivision: string | undefined;
  selectedStandard: string | undefined;
  selectedDivisionId: string = '';
  selectedStandardId: string = '';

  divisions: Division[] | undefined;
  standards: Standard[] | undefined;

  StudentList: any = [];
  ngOnInit() {
    this.GetDivisionList();
    this.GetStandardList();
  }

  constructor(private service: StudentServiceService) { }

  changeDivision(event: any) {
    this.selectedDivisionId = event.value;
  }
  changeStandard(event: any) {
    this.selectedStandardId = event.value;
  }


  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "name" },
    { field: "rollNo" }
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

  GetStudentList() {
    if (this.selectedDivisionId == "") {
      alert('Please select division');
      return;
    }
    if (this.selectedStandardId == "") {
      alert('Please select standard');
      return;
    }

    let params = new HttpParams({ fromString: 'divisionId=' + this.selectedDivisionId + '&standadId=' + this.selectedStandardId });
    this.service.getStudentListByStandardAndDivision(params).subscribe(data => {
      this.StudentList = data;
    })
  }

  onGridReady(params: GridReadyEvent) {

  }

}
