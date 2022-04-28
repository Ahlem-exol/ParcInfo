import { Direction } from './direction.model';
import { Machine } from './machine.model';

export class Network {
  constructor(
    public id: number,
    public macAdd: string,
    public outlook: string,
    public nomMach: string,
    public DNSDomain: string,
    public sessionReseau: string,
    public VPNConfig: string,
    public sessionLocal: string,
    public mdpsSessionLocal: string,
    public observation: string,
    public idMach: number,
    public machine: Machine
  ) {}
}
