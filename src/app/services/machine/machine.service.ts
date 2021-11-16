import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/models/employee.model';
import { Machine } from 'src/app/models/machine.model';
const BACKEND_URL ='http://localhost:3000/api/machine';

interface MachineAdd {
   categorieMach: string,
   typeMach: string,
   marqueMach :string,
   numSerie: number,
   numAlrim: number,
   date_entre :Date,
   date_affectation:Date,
   date_reforme:Date,
   cause :string,
   observation:string,
   Emplacement:string,
   etat:string,
   idDir:number,
   idForniss:number,
   idEmp:number,

}

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http:HttpClient,private modalService :NgbModal) { }

  getMachines() {
    return this.http.get<{ message: string, machines: Machine[] }>(BACKEND_URL);
  }

  getmachine(id: number) {
  return  this.http.get<{ message: string, machine: Machine }>(BACKEND_URL + '/' + id);
 }

 updateMachine(machineUp:Machine){
  return this.http.put<{ message: string}>(BACKEND_URL + '/update/' + machineUp.id, machineUp);
 }
 DeleteMachine(idMach:number){
  return this.http.delete<{message:string}>(BACKEND_URL+'/'+idMach);
 }

 
 addMachine(categorieMach:string, typeMach:string, marqueMach:string,numSerie:number,numAlrim:number,
  date_entre:Date,date_affectation:Date,date_reforme:Date,cause:string,observation:string,
  Emplacement:string,etat:string,idDir:number,idForniss:number,idEmp:number){

  const machineAdd: MachineAdd = {     
   categorieMach: categorieMach,
   typeMach:typeMach,
   marqueMach :marqueMach,
   numSerie: numSerie,
   numAlrim: numAlrim,
   date_entre :date_entre,
   date_affectation:date_affectation,
   date_reforme:date_reforme,
   cause :cause,
   observation:observation,
   Emplacement:Emplacement,
   etat:etat,
   idDir:idDir,
   idForniss:idForniss,
   idEmp:idEmp,
  };

   return this.http.post<{ message: string }>(`${BACKEND_URL}/add`, machineAdd);
}
 
}
