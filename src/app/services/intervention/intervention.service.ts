import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Intervention } from 'src/app/models/intervention.model';
import { Logiciel } from 'src/app/models/logiciel.model';
import { Logparinter } from 'src/app/models/logparinter.model';
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
  ListeLogiciel:Logiciel[],
  causeEchec:string,
  lenth:number
}

@Injectable({
  providedIn: 'root'
})

export class InterventionService {

  constructor(private http:HttpClient,private modalService :NgbModal) { }
//router.get('/',InterventionController.getAllIntervention);
  getInterventions(){
    return this.http.get<{ message: string, interventions: Intervention[] }>(BACKEND_URL);
  }

  getInterventionsPerLogociel(){
    return this.http.get<{ message: string, logparinters: Logparinter[] }>(BACKEND_URL+ '/inter');
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
    dateFinInter:Date,dateReparation:Date,etatdereparation:string,etat:string,idDir:number,idMach:number,
    idEmp:number,idLog:number,logiciles:Logiciel[],causeEchec:string,lenth:number){
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
        ListeLogiciel:logiciles,
        causeEchec:causeEchec,
        lenth:lenth
       };    
        return this.http.post<{ message: string }>(`${BACKEND_URL}/add`, interventionAdd);
  }

  UpdateListeOfLogciel(listeLogiciel:Logiciel[],idinter:number, lenth :number){
    const body =
     {listeLogiciel:listeLogiciel,
      idinter:idinter,
      lenth:lenth
    }
    return this.http.put<{message:string}>(BACKEND_URL+"/updatelisteOflogiciel",body);
   }

}
