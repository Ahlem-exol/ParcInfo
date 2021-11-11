export class Direction {
    constructor(
      public id: number,
      public nom: string,
      public numPost: number,
      public effective:number,
      // qui utilise machine
      public nbrEmp: number,
      public nbrMach :number,
      public nbrInterv:number,
      public userPost:string,
      public emplacement:string

    ) { }
  }
  