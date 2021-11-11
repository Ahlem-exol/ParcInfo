import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Direction } from 'src/app/models/direction.model';
import { Employee } from 'src/app/models/employee.model';

interface EmployeeAdd {
   nom: string,
   prenom: string,
   datenaissance:Date,
   post: string,
   numtel:string,
   mailPers:string,
   numpost:number,
   matricule:number,
   adresse:string,
   idDir :number

}
const BACKEND_URL ='http://localhost:3000/api/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private employees :Employee[]=[];
  private _employees = new BehaviorSubject<Employee[]>([]);
  constructor(private http:HttpClient,private modalService :NgbModal) { }

  getEmployees() {
    return this.http.get<{ message: string, employees: Employee[] }>(BACKEND_URL);
  }

  getEmployee(id: number) {
   return  this.http.get<{ message: string, employee: Employee }>(BACKEND_URL + '/' + id);


}

  addEmployee(nom:string, prenom:string, post:string,
    datenaissance:Date,numtel:string,mailPers:string,
    matricule:number,numpost:number,adresse:string,idDir:number){
    const employeeAdd: EmployeeAdd = {     
      nom: nom,
      prenom: prenom,
      datenaissance:datenaissance,
      post: post,
      numtel:numtel,
      mailPers:mailPers,
      numpost:numpost,
      matricule:matricule,
      adresse:adresse,
      idDir :idDir
    };

     console.log(" the service   " +employeeAdd.nom);
     return this.http.post<{ message: string }>(`${BACKEND_URL}/add`, employeeAdd);
  }

  UpdateEmp(updateEmp:Employee){
    return this.http.put<{ message: string}>(BACKEND_URL + '/update/' + updateEmp.id, updateEmp);
   }
 DeleteEmp(idEmp:number){
   return this.http.delete<{message:string}>(BACKEND_URL+'/'+idEmp);
 }
 
 
}
