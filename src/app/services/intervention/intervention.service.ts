import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Intervention } from 'src/app/models/intervention.model';
const BACKEND_URL ='http://localhost:3000/api/intervention';
interface InterventionAdd {
  typeInterv: string,
  descreption: string,
  remarque :string,
  dure: number,
  dateDemandeInter :Date,
  dateFinInter:Date,
  dateReparation:Date,
  etatdereparation:string,
  etat:string,
  idDir:number,
  idMach:number,
  idEmp:number,
  idLog: number,
}

@Injectable({
  providedIn: 'root'
})

export class InterventionService {

  constructor(private http:HttpClient,private modalService :NgbModal) { }

  getInterventions(){
    return this.http.get<{ message: string, interventions: Intervention[] }>(BACKEND_URL);
  }

  getIntervention(id: number) {
    return  this.http.get<{ message: string, intervention: Intervention }>(BACKEND_URL + '/' + id);
 }

 updateIntervention(interventionUpdate:Intervention){
  return this.http.put<{ message: string}>(BACKEND_URL + '/update/' + interventionUpdate.id, interventionUpdate);
 }

 updateEtat(id:number,etat:string){
 const body = {etat : etat};
  return this.http.put<{ message: string}>(BACKEND_URL + '/updateEtat/' + id, body);
 }

 DeleteIntervention(idInter:number){
  return this.http.delete<{message:string}>(BACKEND_URL+'/'+idInter);
 }

 addIntervention(typeInterv:string, descreption:string, remarque:string,dure:number,dateDemandeInter:Date,
    dateFinInter:Date,dateReparation:Date,etatdereparation:string,etat:string,idDir:number,idMach:number,idEmp:number,idLog:number){
      const interventionAdd: InterventionAdd = {     
        typeInterv: typeInterv,
        descreption: descreption,
        remarque :remarque,
        dure: dure,
        dateDemandeInter :dateDemandeInter,
        dateFinInter:dateFinInter,
        dateReparation:dateReparation,
        etatdereparation:etatdereparation,
        etat:etat,
        idDir:idDir,
        idMach:idMach,
        idEmp:idEmp,
        idLog: idLog,
       };
     
        return this.http.post<{ message: string }>(`${BACKEND_URL}/add`, interventionAdd);

  }

}
