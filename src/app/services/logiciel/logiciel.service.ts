import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { Logiciel } from 'src/app/models/logiciel.model';
import { LogParDir } from 'src/app/models/LogParDir.model';
const BACKEND_URL ='http://localhost:3000/api/logiciel';
interface LogicielAdd {
  logo: string;
  nomLog: string;
  type: string;
  owner: string;
  versionLog: string;
  comptabilite: string;
  Licence: string;
  datedactivation: Date;
  datefin: Date;
  lienTelechr: string;
  observation: string;

  ////////////////////
  idForniss: number;
}
@Injectable({
  providedIn: 'root',
})
export class LogicielService {
  constructor(private http: HttpClient, private modalService: NgbModal) {}

  getLogiciels() {
    return this.http.get<{ message: string; logiciels: Logiciel[] }>(
      BACKEND_URL
    );
  }

  //  LogPaDir
  getLogPaDir() {
    return this.http.get<{ message: string; logpardirs: LogParDir[] }>(
      BACKEND_URL + '/LogPaDir'
    );
  }

  addLogiciel(
    logo: string,
    nomLog: string,
    type: string,
    owner: string,
    versionLog: string,
    comptabilite: string,
    Licence: string,
    datedactivation: Date,
    datefin: Date,
    lienTelechr: string,
    observation: string,
    idForniss: number
  ) {
    const logicielAdd: LogicielAdd = {
      logo: logo,
      nomLog: nomLog,
      type: type,
      owner: owner,
      versionLog: versionLog,
      comptabilite: comptabilite,
      Licence: Licence,
      datedactivation: datedactivation,
      datefin: datefin,
      lienTelechr: lienTelechr,
      observation: observation,

      idForniss: idForniss,
    };
    console.log(logicielAdd);
    return this.http.post<{ message: string }>(
      `${BACKEND_URL}/add`,
      logicielAdd
    );
  }
}
