import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/models/employee.model';
import { Hard } from 'src/app/models/hard.model';
import { Logiciel } from 'src/app/models/logiciel.model';
import { Machine } from 'src/app/models/machine.model';
import { Network } from 'src/app/models/network.model';
const BACKEND_URL = 'http://localhost:3000/api/machine';

interface MachineAdd {
  categorieMach: string;
  typeMach: string;
  marqueMach: string;
  numSerie: number;
  numAlrim: number;
  date_entre: Date;
  date_affectation: Date;
  date_reforme: Date;
  cause: string;
  observation: string;
  Emplacement: string;
  etat: string;
  idDir: number;
  idForniss: number;
  idEmp: number;
}

interface HardAdd {
  RAM: string;
  Processor: string;
  CarteGraphique: string;
  espaceStokage: string;
  Appphoto: string;
  Bluetouth: string;
  cartReseau: string;
  cartReseau2: string;
  cartReseau3: string;
  idMach: number;
}

interface NetworkAdd {
  macAdd: string;
  outlook: string;
  nomMach: string;
  DNSDomain: string;
  sessionReseau: string;
  VPNConfig: string;
  sessionLocal: string;
  mdpsSessionLocal: string;
  observation: string;
  idMach: number;
}

interface LogicielsAdd {
  idMach: number;
  logiciles: Logiciel[];
  lenth: number;
  dateInstallation: Date;
}

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  constructor(private http: HttpClient, private modalService: NgbModal) {}

  getMachines() {
    return this.http.get<{ message: string; machines: Machine[] }>(BACKEND_URL);
  }

  getmachine(id: number) {
    return this.http.get<{ message: string; machine: Machine }>(
      BACKEND_URL + '/' + id
    );
  }

  updateMachine(machineUp: Machine) {
    return this.http.put<{ message: string }>(
      BACKEND_URL + '/update/' + machineUp.id,
      machineUp
    );
  }

  DeleteMachine(idMach: number) {
    return this.http.delete<{ message: string }>(BACKEND_URL + '/' + idMach);
  }

  addMachine(
    categorieMach: string,
    typeMach: string,
    marqueMach: string,
    numSerie: number,
    numAlrim: number,
    date_entre: Date,
    date_affectation: Date,
    date_reforme: Date,
    cause: string,
    observation: string,
    Emplacement: string,
    etat: string,
    idDir: number,
    idForniss: number,
    idEmp: number
  ) {
    const machineAdd: MachineAdd = {
      categorieMach: categorieMach,
      typeMach: typeMach,
      marqueMach: marqueMach,
      numSerie: numSerie,
      numAlrim: numAlrim,
      date_entre: date_entre,
      date_affectation: date_affectation,
      date_reforme: date_reforme,
      cause: cause,
      observation: observation,
      Emplacement: Emplacement,
      etat: etat,
      idDir: idDir,
      idForniss: idForniss,
      idEmp: idEmp,
    };
    console.log(machineAdd);
    return this.http.post<{ message: string }>(
      `${BACKEND_URL}/add`,
      machineAdd
    );
  }

  /// add information de hardwar of the machine

  addHard(
    RAM: string,
    Processor: string,
    CarteGraphique: string,
    espaceStokage: string,
    Appphoto: string,
    Bluetouth: string,
    cartReseau: string,
    cartReseau2: string,
    cartReseau3: string,
    idMach: number
  ) {
    const hardAdd: HardAdd = {
      RAM: RAM,
      Processor: Processor,
      CarteGraphique: CarteGraphique,
      espaceStokage: espaceStokage,
      Appphoto: Appphoto,
      Bluetouth: Bluetouth,
      cartReseau: cartReseau,
      cartReseau2: cartReseau2,
      cartReseau3: cartReseau3,
      idMach: idMach,
    };
    console.log(hardAdd);
    return this.http.post<{ message: string }>(
      `${BACKEND_URL}/addHard`,
      hardAdd
    );
  }

  GetHardData(id: number) {
    return this.http.get<{ message: string; HardInfo: Hard }>(
      BACKEND_URL + '/GetHardDetaille/' + id
    );
  }

  addNetwork(
    macAdd: string,
    outlook: string,
    nomMach: string,
    DNSDomain: string,
    sessionReseau: string,
    VPNConfig: string,
    sessionLocal: string,
    mdpsSessionLocal: string,
    observation: string,
    idMach: number
  ) {
    const NetworkAdd: NetworkAdd = {
      macAdd: macAdd,
      outlook: outlook,
      nomMach: nomMach,
      DNSDomain: DNSDomain,
      sessionReseau: sessionReseau,
      VPNConfig: VPNConfig,
      sessionLocal: sessionLocal,
      mdpsSessionLocal: mdpsSessionLocal,
      observation: observation,
      idMach: idMach,
    };
    console.log(NetworkAdd);
    return this.http.post<{ message: string }>(
      `${BACKEND_URL}/addNetwork`,
      NetworkAdd
    );
  }

  GetNetworkData(id: number) {
    return this.http.get<{ message: string; NetworkData: Network }>(
      BACKEND_URL + '/GetNetworkDetaille/' + id
    );
  }
  addLogiciels(
    idMach: number,
    logiciles: Logiciel[],
    lenth: number,
    dateInstallation: Date
  ) {
    const LogicielsAdd: LogicielsAdd = {
      idMach: idMach,
      logiciles: logiciles,
      lenth: lenth,
      dateInstallation: dateInstallation,
    };
    return this.http.post<{ message: string }>(
      `${BACKEND_URL}/addLogiciels`,
      LogicielsAdd
    );
  }
}


 
