import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddEditDepartmentComponent } from '../add-edit-department/add-edit-department.component';
import { ApiserviceService } from '../../services/apiservice.service';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-show-department',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FormsModule, AddEditDepartmentComponent, MatButton],
  templateUrl: './show-department.component.html',
  styleUrl: './show-department.component.scss'
})
export class ShowDepartmentComponent implements OnInit {

  constructor(private service: ApiserviceService) { }

  DepartmentList: any = [];
  ModalTitle = "";
  ActivateAddEditDepartComp: boolean = false;
  depart: any;

  DepartmentIdFilter = "";
  DepartmentNameFilter = "";
  DepartmentListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick() {
    this.depart = {
      DepartmentId: "0",
      DepartmentName: ""
    }
    this.ModalTitle = "Add Department";
    this.ActivateAddEditDepartComp = true;
  }

  editClick(item: any) {
    this.depart = item;
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditDepartComp = true;
  }

  deleteClick(item: any) {

    if (confirm('Are you sure??')) {
      this.service.deleteDepartment(item.departmentID).subscribe(data => {
        alert(data.toString());
        this.refreshDepList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditDepartComp = false;
    this.refreshDepList();
  }


  refreshDepList() {
    this.service.getDepartmentList().subscribe(data => {
      this.DepartmentList = data;
      this.DepartmentListWithoutFilter = data;
    });
  }

  sortResult(prop: any, asc: any) {
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

  FilterFn() {
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(
      function (el: any) {
        return el.departmentID.toString().toLowerCase().includes(
          DepartmentIdFilter.toString().trim().toLowerCase()
        ) &&
          el.departmentName.toString().toLowerCase().includes(
            DepartmentNameFilter.toString().trim().toLowerCase())
      }
    );
  }
}