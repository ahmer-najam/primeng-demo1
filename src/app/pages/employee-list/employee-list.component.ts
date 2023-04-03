import { Employee } from './../../shared/employee.interface';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Department } from 'src/app/shared/department.interface';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  deptList: Department[] = [];
  modalVisible = false;
  selectedRow: Employee;
  isLoading = false;

  constructor(public service: EmployeeService) {}

  ngOnInit(): void {
    this.dataMapping();
  }

  dataMapping = () => {
    this.service.getDepartmentData().subscribe((dept) => {
      this.deptList = dept.departments;
      this.employeeMapping(this.deptList);
    });
  };

  employeeMapping = (deptList: Department[]) => {
    this.service.getEmployeeData().subscribe((item) => {
      let emp: Employee[] = item.employees;

      this.employees = this.setEmployeeDeptName(emp, deptList);
    });
  };

  setEmployeeDeptName = (emp: Employee[], dept: Department[]) => {
    emp.forEach((e) => {
      let dName = dept.find((d) => {
        return d.deptId == e.deptId;
      });

      if (dName) {
        e.deptName = dName.deptName;
      } else {
        e.deptName = 'Other Dept.';
      }
    });

    return emp;
  };
}
