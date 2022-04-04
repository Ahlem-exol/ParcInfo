export class Direction {
    constructor(
      public id: number,
      public nom: string,
      public numPost: number,
      public effective:number,
      // variable a calcule
      public nbrEmp: number,
      public nbrMach :number,
      public nbrInterv:number,
      public userPost:string,
      public emplacement:string

    ) { }
  }
  