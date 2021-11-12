import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const BACKEND_URL ='http://localhost:3000/api/document';

interface DocumentAdd {
   titreDoc: string,
   lienDoc: string,
   descreption :string,
   idEmp: number,
   idForniss: number,
   idInterv :number,
   idDir:number,
   idPro:number,
   dateSortie:Date,

}
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http:HttpClient,private modalService :NgbModal) { }

  addDocument(titreDoc:string, lienDoc:string, descreption:string,idEmp:number,idForniss:number,
    idInterv:number,idDir:number,idPro:number,dateSortie:Date){
  
    const machineAdd: DocumentAdd = {     
      titreDoc: titreDoc,
      lienDoc: lienDoc,
      descreption :descreption,
      idEmp: idEmp,
      idForniss: idForniss,
      idInterv :idInterv,
      idDir:idDir,
      idPro:idPro,
      dateSortie:dateSortie,
    };
  
     return this.http.post<{ message: string }>(`${BACKEND_URL}/add`, machineAdd);
  }
   
  }
  
