import { FormBuilder } from "@angular/forms";
import { Direction } from "./direction.model";
import { Employee } from "./employee.model";
import { Fournisseur } from "./fournisseur.model";
import { Logiciel } from "./logiciel.model";
import { Machine } from "./machine.model";

export class Intervention {
    constructor(
      public id: number,
      public typeInterv: string,
      public descreption: string,
      public remarque :string,
      public dure: number,

      public dateDemandeInter :Date,
      public dateFinInter:Date,
      public dateReparation:Date,

      public etatdereparation:string,
      public causeEchec:string,
      public etat:string,

      public idDir:number,
      public direction:Direction,

      public idMach:number,
      public machine:Machine,

      public idEmp:number,
      public employee:Employee,
      
      public idLog: number,
      public ListeLogiciel:Logiciel[],
      public logiciel:Logiciel,
    ) { }
  }
