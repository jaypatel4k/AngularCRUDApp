import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../services/apiservice.service';
import { CommonModule } from '@angular/common';
import { AddedittestempComponent } from '../addedittestemp/addedittestemp.component';


@Component({
  selector: 'app-showtestemp',
  imports: [CommonModule, AddedittestempComponent],
  templateUrl: './showtestemp.component.html',
  styleUrl: './showtestemp.component.scss'
})
export class ShowtestempComponent implements OnInit {
  items = ['First', 'Second'];
  employeeList: any = [];
  emp: any;
  ActivateAddEditEmpComp: boolean = false;
  constructor(private service: ApiserviceService) { }

  ngOnInit(): void {
    this.refreshEmpList();
  }
  ModalTitle = "Emloyee List";

  addItemFromChild(value: string) {
    this.items.push(value);
  }
  addClick() {
    this.emp = {
      EmployeeId: "0",
      EmployeeName: "",
      Department: "",
      DepartmentID: "0"
      //DateOfJoining: "",
      //PhotoFileName: "anonymous.png"
    }
    this.ModalTitle = "Add Employee";
    this.ActivateAddEditEmpComp = true;
  }

  refreshEmpList() {
    this.service.getEmployeeList().subscribe(data => {
      this.employeeList = data;
      //console.log(data);
    });
  }

  editClick(item: any) {
    this.emp = item;
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditEmpComp = true;
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }
}
