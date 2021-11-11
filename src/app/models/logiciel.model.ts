import { Fournisseur } from "./fournisseur.model";

export class Logiciel {
    constructor(
      public idLog: number,
      public nomLog: string,
      public logo:string,
      public versionLog: string,
      public Licence:string,
      public type: string,
      public comptabilite :string,
      public observation:string,
      public lienTelechr:string,
      ////////////////////
      public idForniss:number,
      public fournisseur:Fournisseur

    ) { }
  }
  