import { FormBuilder } from "@angular/forms";
import { Direction } from "./direction.model";
import { Employee } from "./employee.model";
import { Fournisseur } from "./fournisseur.model";

export class Machine {
    constructor(
      public id: number,
      public categorieMach: string,
      public typeMach: string,
      public marqueMach :string,
      public numSerie: number,
      public numAlrim: number,
      public date_entre :Date,
      public date_affectation:Date,
      public date_reforme:Date,
      public cause :string,
      public observation:string,
      public Emplacement:string,
      public etat:string,
      public idDir:number,
      public direction:Direction,
      public idForniss:number,
      public fournisseur:Fournisseur,
      public idEmp:number,
      public employee:Employee,
    ) { }
  }


  // ``, ``, ``, ``, ``, `observation`, `idForniss`, `idDir`, `Emplacement`