import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiserviceService } from '../../services/apiservice.service';


@Component({
  selector: 'app-add-edit-department',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-edit-department.component.html',
  styleUrl: './add-edit-department.component.scss'
})
export class AddEditDepartmentComponent implements OnInit {

  constructor(private service: ApiserviceService) { }

  @Input() depart: any;
  DepartmentId = "";
  DepartmentName = "";

  ngOnInit(): void {

    this.DepartmentId = this.depart.departmentID;
    this.DepartmentName = this.depart.departmentName;
  }

  addDepartment() {
    var dept = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    this.service.addDepartment(dept).subscribe(res => {
      alert(res.toString());
    });
  }

  updateDepartment() {
    var dept = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    var deptid = Number(this.DepartmentId);
    this.service.updateDepartment(deptid, dept).subscribe(res => {
      console.log(this.DepartmentId)
      alert(res.toString());
    });
  }
}