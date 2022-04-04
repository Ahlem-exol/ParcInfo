import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Direction } from 'src/app/models/direction.model';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const BACKEND_URL ='http://localhost:3000/api/dir';

@Injectable({
  providedIn: 'root'
})

export class DirectionService {
 private directions :Direction[]=[];
 private _directions =new BehaviorSubject<Direction[]>([]);
  constructor(private http:HttpClient,private modalService :NgbModal) { }

  getDirections() {

    return this.http.get<{ message: string, directions: Direction[] }>(BACKEND_URL);
  }

  getDirection(nomDir:string) {
  //  console.log(nomDir)
    return this.http.get<{ message: string, direction: Direction }>(BACKEND_URL+ '/' + nomDir);
  }

}
