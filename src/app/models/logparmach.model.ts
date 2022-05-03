import { Logiciel } from './logiciel.model';

export class Logparmach {
  constructor(
    public idLPM: number,
    ////////////////////
    public idMach: number,
    public idLog: number,

    public dateInstallation: Date,
    public logiciel: Logiciel
  ) {}
}
