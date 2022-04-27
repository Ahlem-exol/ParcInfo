import { Machine } from './machine.model';

export class Hard {
  constructor(
    public idInfoM: number,
    public RAM: string,
    public Processor: string,
    public CarteGraphique: string,
    public idMach: number,
    public machine: Machine
  ) {}
}
