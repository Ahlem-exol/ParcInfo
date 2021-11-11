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
    // this.http.get<{ message: string, employees: Employee[] }>(BACKEND_URL).pipe(take(1)).subscribe((empData) => {
    //   console.log(empData.employees)
    //   this.employees = empData.employees;
     
    //   this._employees.next([...this.employees]);
    // });
    // return [...this.employees];
    console.log('we in the service');
    return this.http.get<{ message: string, directions: Direction[] }>(BACKEND_URL);
  }


}
