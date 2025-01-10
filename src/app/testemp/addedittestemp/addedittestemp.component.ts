import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { ApiserviceService } from '../../services/apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addedittestemp',
  imports: [CommonModule, FormsModule],
  templateUrl: './addedittestemp.component.html',
  styleUrl: './addedittestemp.component.scss'
})
export class AddedittestempComponent {

  constructor(private service: ApiserviceService) { }
  @Output() iamfromchild = new EventEmitter<string>();
  @Input() empchild: any;
  EmployeeId = "";
  EmployeeName = "";
  Department = "";
  DeaprtmentId = "";
  DateOfJoining = "";
  PhotoFileName = "";
  PhotoFilePath = "";
  DepartmentList: any = [];

  ngOnInit(): void {
    this.loadEmployeeList();
    this.sendtoparentTest();
  }

  sendtoparentTest() {
    this.iamfromchild.emit("I am from child");
  }
  loadEmployeeList() {

    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentList = data;
      this.EmployeeId = this.empchild.employeeID;
      this.EmployeeName = this.empchild.name;
      this.Department = "MARKETING" //this.empchild.department;
      this.DeaprtmentId = this.empchild.DepartmentID;
      // this.DateOfJoining = this.emp.DateOfJoining;
      // this.PhotoFileName = this.emp.PhotoFileName;
      // this.PhotoFilePath = this.service.photoUrl + this.PhotoFileName;
    });
  }

}
