import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Fournisseur } from 'src/app/models/fournisseur.model';

const BACKEND_URL ='http://localhost:3000/api/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  constructor(private http:HttpClient,private modalService :NgbModal) { }

  getFournisseur() {
    return this.http.get<{ message: string, fournisseurs: Fournisseur[] }>(BACKEND_URL);
  }

}
