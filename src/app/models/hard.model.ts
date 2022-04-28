import { Machine } from './machine.model';

export class Hard {
  constructor(
    public idInfoM: number,
    public RAM: string,
    public Processor: string,
    public CarteGraphique: string,
    public espaceStokage: string,
    public Appphoto: string,
    public Bluetouth: string,
    public cartReseau: string,
    public cartReseau2: string,
    public cartReseau3: string,
    public idMach: number,
    public machine: Machine
  ) {}
}
