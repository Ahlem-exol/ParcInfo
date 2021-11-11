
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Direction } from 'src/app/models/direction.model';
import { Employee } from 'src/app/models/employee.model';
import { Intervention } from 'src/app/models/intervention.model';
import { Logiciel } from 'src/app/models/logiciel.model';
import { Machine } from 'src/app/models/machine.model';
import { DirectionService } from 'src/app/services/direction/direction.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { InterventionService } from 'src/app/services/intervention/intervention.service';
import { LogicielService } from 'src/app/services/logiciel/logiciel.service';
import { MachineService } from 'src/app/services/machine/machine.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

declare interface type {
  title: string;
  icon: string;
}

@Component({
  selector: 'app-liste-intervention',
  templateUrl: './liste-intervention.component.html',
  styleUrls: ['./liste-intervention.component.scss'],

})
export class ListeInterventionComponent implements OnInit,OnDestroy {

  typedIntervention :type[]=[
    { title: 'Reparation Software',  icon: 'ni-tv-2 text-primary'}, //other
    { title: 'Installation Software',  icon: 'ni-tv-2 text-primary'},
    { title: 'Reparation/configuration software',  icon: 'ni-tv-2 text-primary'},
    { title: 'Recuperation des données',  icon: 'ni-tv-2 text-primary'},
    { title: 'Assitence',  icon: 'ni-tv-2 text-primary'},
    { title: 'Reparation Hardware ',  icon: 'ni-tv-2 text-primary' },
    { title: 'Reparation port/cablage reseau',  icon: 'ni-tv-2 text-primary'},
  ];

  etat :type[]=[
    { title: 'Demande',  icon: 'badge badge-info'}, //other
    { title: 'Annule',  icon: 'badge badge-danger'},
    { title: 'In progress',  icon: 'badge badge-warning'},
    { title: 'Completed',  icon: 'badge badge-success'}
  ];
  date= new Date();
  constructor(private modalService: NgbModal,private interventionService:InterventionService,
    private machineService :MachineService ,private employeeService:EmployeeService,private router: Router,
    private directionservice :DirectionService, private notifyService :NotificationService,private logicielservice:LogicielService) { 

    }
 
  sub: Subscription;
  loaddedIntervention : Intervention[];
  
  sub2:Subscription;
  loadedDirections :Direction[];
  
  sub3:Subscription;
  loadedEmployee :Employee[];

  sub4:Subscription;
  loadedMachine :Machine[];

  sub5:Subscription;
  loadedLogiciel:Logiciel[];

  
  ngOnInit(): void {
    this.sub =  this.interventionService.getInterventions().subscribe(minterdata => {
      console.log("liste des eintervention",minterdata.interventions);
       this.loaddedIntervention = minterdata.interventions;
     })
         
     this.sub2 =  this.directionservice.getDirections().subscribe(dirdata => {

       this.loadedDirections = dirdata.directions;
     })

     this.sub3 =  this.employeeService.getEmployees().subscribe(empdata => {
       this.loadedEmployee = empdata.employees;
     })

     this.sub4 =  this.machineService.getMachines().subscribe(machdata => {
       this.loadedMachine = machdata.machines;
     })

     this.sub5 =  this.logicielservice.getLogiciels().subscribe(logdata => {
       this.loadedLogiciel = logdata.logiciels;
     })

 


  }


  addIntervention(form: NgForm){
    const typeInterv= form.value.typeInterv;
    const descreption= form.value.descreption;
    const remarque = form.value.remarque;
    const dure= form.value.dure;
    const dateDemandeInter = form.value.dateDemandeInter;
    const dateFinInter= form.value.dateFinInter;
    const dateReparation= form.value.dateReparation;
    const etatdereparation= "sfdqsfsdf";
    const etat= form.value.etat;
    var idDir= Number(form.value.idDir);
    if (!idDir){
      idDir = 1;
    }
    var idMach= Number(form.value.idMach);    
    if (!idMach){
      idMach = 1;
      }
    var idEmp= Number(form.value.idEmp);   
    if (!idEmp){
      idEmp = 1;
      }
    var idLog= Number(form.value.idLog);
    if (!idLog){
      idLog = 1;
       }
console.log("the add intervention",typeInterv, descreption, remarque,dure,dateDemandeInter,
dateFinInter,dateReparation,etatdereparation,etat,idDir,idMach,idEmp,idLog)
    this.interventionService.addIntervention(typeInterv, descreption, remarque,dure,dateDemandeInter,
      dateFinInter,dateReparation,etatdereparation,etat,idDir,idMach,idEmp,idLog).subscribe(res => {
      this.notifyService.showSuccess("Add with success ","Add");
     this.ngOnInit();
  })

  }





  detaille(intervention:string){
    this.router.navigate(['/intervension-detaill' , { id: intervention }]);
  }

  ngOnDestroy(): void {
   this.sub.unsubscribe();
   this.sub2.unsubscribe();
   this.sub3.unsubscribe();
   this.sub4.unsubscribe();
   this.sub5.unsubscribe();
    }

 
  openMediumModal( mediumModalContent: any ) {
    this.modalService.open( mediumModalContent );
  }

  //pour get type de reparatoioin
  modal2 :string="";
  onForm2NameChange({ target }: {target:any}) {
    this.modal2 = target.value; 
  }

  //pour get letat
  modal3 :string="";
  onForm4NameChange({ target }: {target:any}) {
    this.modal3 = target.value; 
  }

  //pour get only the employee machines
  model3:number=0 ;
  onForm3NameChange({ target }: {target:any}) {
    this.model3 = Number(target.value); 
    console.log(target.value);
    console.log(typeof(this.model3))
  }
    
  nom:any;
  p:number = 1;
  //pour table serach 
  Search(){
    if(this.nom == ""){
      this.ngOnInit();
    }else{
      this.loaddedIntervention = this.loaddedIntervention.filter(res =>{
        return res.employee.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
      })
    }
  }

  key: string = 'id';
  reverse: boolean= false;
  sort(key: any){
    this.key = key;
    this.reverse = !this.reverse;
  }
  
}