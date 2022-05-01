import { Fournisseur } from "./fournisseur.model";

export class Logiciel {
  constructor(
    public idLog: number,
    public logo: string,
    public nomLog: string,
    public type: string,
    public owner: string,
    public versionLog: string,
    public comptabilite: string,
    public Licence: string,
    public datedactivation: Date,
    public datefin: Date,
    public lienTelechr: string,
    public observation: string,

    ////////////////////
    public idForniss: number,
    public fournisseur: Fournisseur
  ) {}
}
  