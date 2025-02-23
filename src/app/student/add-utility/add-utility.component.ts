import { Component } from '@angular/core';
import { StudentNavigationComponent } from "../student-navigation/student-navigation.component";
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, matSelectAnimations } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { StudentServiceService } from '../../services/student-service.service';

class utility {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

@Component({
  selector: 'app-add-utility',
  imports: [FormsModule, StudentNavigationComponent, MatLabel, MatFormField, MatSelect, MatOption, MatInput, MatButton, NgFor],
  templateUrl: './add-utility.component.html',
  styleUrl: './add-utility.component.scss'
})
export class AddUtilityComponent {
  selectedTestTypeId: string | undefined;
  message: string | undefined;
  errormessage: string | undefined;
  fType: string = '';
  fValue: string = '';

  constructor(private service: StudentServiceService) { }

  utilityList: utility[] = [
    new utility("AddTestType", "Add Test Type"),
    new utility('AddSubject', 'Add Subject'),
    new utility('AddDivision', 'Add Division')
  ];

  onSubmit(utilityForm: any) {
    let formData = new FormData();
    this.fType = utilityForm.value.fieldtype;
    this.fValue = utilityForm.value.fieldvalue;
    formData.append('fieldtype', this.fType);
    formData.append('fieldvalue', this.fValue);
    // this.service.AddSubjectOrDivOrTesttype(formData);
    this.service.AddSubjectOrDivOrTesttype(formData).subscribe({
      next: (res) => {
        this.message = res.success;
      },
      error: (e) => {
        this.setErrorMessage(e.error);
      }
    })
  }

  setErrorMessage(strmessage: string) {
    this.errormessage = strmessage;
  }



}
