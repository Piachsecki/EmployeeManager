import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{


  public employees: Employee[] | undefined;
editEmployee: Employee | undefined;
public deleteEmployee: Employee;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }



  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onOpenModal(employee: Employee, mode: string): void{
    const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal')

    if(mode === 'add'){
      button.setAttribute('data-target', '#addEmployeeModal')
    }
    if(mode === 'edit'){
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal')
    }
    if(mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal')
    }

    container?.appendChild(button);
    button.click();

  }


public  searchEmployees(key: string): void {
  const results: Employee[] = [];

  for(const employee of this.employees) {
    if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1){
      results.push(employee);
    }
    this.employees = results;
    if(results.length === 0 || !key){
      this.getEmployees();
    }
  }

}



  public onAddEmloyee(addForm: NgForm): void {
    
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();

      }

    );
  }



  public onUpdateEmloyee(employee: Employee): void {
        this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }


  public onDeleteEmloyee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }





}
