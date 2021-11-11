import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Direction } from 'src/app/models/direction.model';
import { Employee } from 'src/app/models/employee.model';
import { DirectionService } from 'src/app/services/direction/direction.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-liste-employee',
  templateUrl: './liste-employee.component.html',
  styleUrls: ['./liste-employee.component.scss']
})
export class ListeEmployeeComponent implements OnInit ,OnDestroy{
  sub: Subscription;
  loadedEmployees :Employee[];

  sub2:Subscription;
  loadedDirections :Direction[];
  constructor(private modalService: NgbModal,private employeeService:EmployeeService,private router: Router,
    private directionservice :DirectionService) { }

 ngOnInit(): void {
   this.sub =  this.employeeService.getEmployees().subscribe(empdata => {
     console.log(empdata.employees);
      this.loadedEmployees = empdata.employees;
    })

    this.sub2 = this.directionservice.getDirections().subscribe(dirdata=> {
      console.log(dirdata.directions);
      this.loadedDirections = dirdata.directions;
    })
   }

/////////////////////:::add user
onSubmit(form: NgForm) {
  const nom = form.value.nom;
  const prenom = form.value.prenom;
  const poste = form.value.post;
  const datenaissance =form.value.datenaissance;
  const idDiraction = form.value.idDir;
  const numtel =form.value.numtel;
  const mailPers=form.value.mailPers;
  const matricule =form.value.matricule;
  const numpost = form.value.numpost;
  const adresse= form.value.adresse;
  const idDir = Number(idDiraction);
  
  this.employeeService.addEmployee(nom,prenom,poste,datenaissance,numtel,mailPers,matricule,numpost,adresse,idDir).subscribe(res => {
   this.ngOnInit();
 });
}



   ngOnDestroy(): void {
    this.sub.unsubscribe;
   }
   //ajouter model
  openMediumModal( mediumModalContent: any ) {
    this.modalService.open( mediumModalContent );
  }
  nom:any;
  p:number = 1;
  
  //pour table serach 
  Search(){
    if(this.nom == ""){
      this.ngOnInit();
    }else{
      this.loadedEmployees = this.loadedEmployees.filter(res =>{
        return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
      })
    }
  }

  key: string = 'id';
  reverse: boolean= false;
  sort(key: any){
    this.key = key;
    this.reverse = !this.reverse;
  }

  detaille(employee:string){
    console.log("ID employee est " +employee);
    // sand id in the url 
    this.router.navigate(['/employee-detaill' , { id: employee }]);
  }




}
