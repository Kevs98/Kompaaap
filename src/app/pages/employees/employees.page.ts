import { Component, OnInit } from '@angular/core';
import { eI } from '../../models/employees.interface';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {

  employees: eI[];

  constructor( private employeesService: EmployeesService) { }

  ngOnInit() {
    this.employeesService.getEmployees().subscribe(res => {
      this.employees = res;
    });
  }

}
