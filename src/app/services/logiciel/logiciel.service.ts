import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { Logiciel } from 'src/app/models/logiciel.model';
import { LogParDir } from 'src/app/models/LogParDir.model';
const BACKEND_URL ='http://localhost:3000/api/logiciel';
@Injectable({
  providedIn: 'root'
})
export class LogicielService {

   constructor(private http:HttpClient,private modalService :NgbModal) { }
 
   getLogiciels() {
     return this.http.get<{ message: string, logiciels: Logiciel[] }>(BACKEND_URL);
   }

  //  LogPaDir
  getLogPaDir() {
    return this.http.get<{ message: string, logpardirs: LogParDir[] }>(BACKEND_URL+"/LogPaDir");
  }
}
