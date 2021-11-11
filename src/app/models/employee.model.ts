import { Direction } from "./direction.model";

export class Employee {
    constructor(
      public id: number,
      public nom: string,
      public prenom: string,
      public datenaissance:Date,
      public post: string,
      public numtel:string,
      public mailPers:string,
      public numpost:number,
      public matricule:number,
      public adresse:string,
      public idDir :number,
      public direction:Direction

    ) { }
  }
  