
import { Direction } from "./direction.model";
import { Fournisseur } from "./fournisseur.model";
import { Logiciel } from "./logiciel.model";

export class LogParDir {
    constructor(
      public idLpd: number,
      //////////////////// `idDir`, `idLog
      public idDir:number,
      public idLog:number,
      

    ) { }
  }
  