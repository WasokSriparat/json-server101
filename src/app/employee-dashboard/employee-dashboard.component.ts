import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl} from '@angular/forms'
import { EmployeeModels } from './employee-dashboard.models';
import {ApiService} from '../shared/api.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formEmployee!: FormGroup;
  employeeModel: EmployeeModels = new EmployeeModels();
  employeeData!: any;
  showAdd!:boolean ;
  showUpdate!:boolean ;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.formEmployee = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      telephone: new FormControl(),
      salary: new FormControl(),
    }),
    this.getEmployee()
  }
    postEmployee(){
        this.employeeModel.firstName = this.formEmployee.value.firstName
        this.employeeModel.lastName = this.formEmployee.value.lastName
        this.employeeModel.email = this.formEmployee.value.email
        this.employeeModel.telephone = this.formEmployee.value.telephone
        this.employeeModel.salary = this.formEmployee.value.salary
        this.api.postEmployee(this.employeeModel)
        .subscribe(res=>{
          Swal.fire("Complete","Add Employee Complete","success")
          this.getEmployee()
          let Close = document.getElementById("close")
          Close!.click()
        },
        _err=>{
          Swal.fire("Error","Add Employee Error","error")
        })
      }

      getEmployee(){
        this.api.getEmployee()
        .subscribe(res=>{
          this.employeeData = res;
        },)

      }
      deleteEmployee(id: number){
        this.api.delEmployee(id)
        .subscribe(res=>{
          Swal.fire("Complete","Delete Employee Complete","success")
          this.getEmployee()
        },
        _err=>{
          Swal.fire("Error","Delete Employee Error","error")
        })
      }

      clickAdd(){
        this.formEmployee.reset()
        this.showAdd = true
        this.showUpdate = false
        this.employeeData.id = 0
      }

      clickEdit(data:any){
        this.showAdd = false
        this.showUpdate = true
        this.employeeData.id = data.id
        this.formEmployee.controls['firstName'].setValue(data.firstName)
        this.formEmployee.controls['lastName'].setValue(data.lastName)
        this.formEmployee.controls['email'].setValue(data.email)
        this.formEmployee.controls['telephone'].setValue(data.telephone)
        this.formEmployee.controls['salary'].setValue(data.salary)
      }

      updateEmployee(){
        this.employeeModel.firstName = this.formEmployee.value.firstName
        this.employeeModel.lastName = this.formEmployee.value.lastName
        this.employeeModel.email = this.formEmployee.value.email
        this.employeeModel.telephone = this.formEmployee.value.telephone
        this.employeeModel.salary = this.formEmployee.value.salary
        this.api.updatemployee(this.employeeData.id,this.employeeModel)
        .subscribe(res=>{
          Swal.fire("Complete","Update Employee Complete","success")
          this.getEmployee()
          let Close = document.getElementById("close")
          Close!.click()
        },
        _err=>{
          Swal.fire("Error","Update Employee Error","error")
        })
      }
      }


