import { Component, OnInit } from '@angular/core';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { NgFor } from '@angular/common';
import { ApiserviceService } from '../../services/apiservice.service';

@Component({
  selector: 'app-show-employee',
  standalone: true,
  imports: [AddEditEmployeeComponent, NgFor],
  templateUrl: './show-employee.component.html',
  styleUrl: './show-employee.component.scss'
})
export class ShowEmployeeComponent implements OnInit {

  constructor(private service: ApiserviceService) { }

  EmployeeList: any = [];
  ModalTitle = "";
  ActivateAddEditEmpComp: boolean = false;
  emp: any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick() {
    this.emp = {
      EmployeeId: "0",
      EmployeeName: "",
      Department: "",
      DateOfJoining: "",
      PhotoFileName: "anonymous.png"
    }
    this.ModalTitle = "Add Employee";
    this.ActivateAddEditEmpComp = true;
  }

  editClick(item: any) {
    this.emp = item;
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteEmployee(item.EmployeeId).subscribe(data => {
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  refreshEmpList() {
    this.service.getEmployeeList().subscribe(data => {
      this.EmployeeList = data;
    });
  }
}