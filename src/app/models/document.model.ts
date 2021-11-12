
export class Document {
    constructor(
      public idDoc: number,
      public titreDoc: string,
      public lienDoc: string,
      public descreption :string,

      public idEmp: number,
      public idForniss: number,
      public idInterv :number,
      public idDir:number,
      public idPro:number,

      public dateSortie:Date,

    ) { }
  }


  // ``, ``, ``, ``, ``, `observation`, `idForniss`, `idDir`, `Emplacement`