import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Direction } from 'src/app/models/direction.model';
import { Employee } from 'src/app/models/employee.model';
import { Intervention } from 'src/app/models/intervention.model';
import { Logiciel } from 'src/app/models/logiciel.model';
import { Machine } from 'src/app/models/machine.model';
import { DirectionService } from 'src/app/services/direction/direction.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { FournisseurService } from 'src/app/services/fournisseur/fournisseur.service';
import { InterventionService } from 'src/app/services/intervention/intervention.service';
import { LogicielService } from 'src/app/services/logiciel/logiciel.service';
import { MachineService } from 'src/app/services/machine/machine.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

declare interface type {
  title: string;
  icon: string;
}

@Component({
  selector: 'app-detaille-intervention',
  templateUrl: './detaille-intervention.component.html',
  styleUrls: ['./detaille-intervention.component.scss']
})
export class DetailleInterventionComponent implements OnInit {

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
  sub: Subscription;
  loaddedIntervention : Intervention;
  
  sub2:Subscription;
  loadedDirections :Direction[];
  
  sub3:Subscription;
  loadedEmployee :Employee[];

  sub4:Subscription;
  loadedMachine :Machine[];

  sub5:Subscription;
  loadedLogiciel:Logiciel[];
  model3 :number
  modal2:string
  constructor(private modalService: NgbModal,private interventionService:InterventionService ,private machineService:MachineService ,private employeeService:EmployeeService
    ,private route: ActivatedRoute,private router: Router, private directionservice :DirectionService
    ,private notifyService : NotificationService, private fournisseurService:FournisseurService,private logicielservice:LogicielService) { }

  ngOnInit(): void {
    const idInter = JSON.parse(this.route.snapshot.paramMap.get('id') || '{}');
    this.sub =  this.interventionService.getIntervention(idInter).subscribe(minterdata => {
       this.loaddedIntervention = minterdata.intervention;
       this.model3=this.loaddedIntervention.employee.id ; 
       this.modal2=this.loaddedIntervention.typeInterv;
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

  detailleEmployee(idEmp:number){
    this.router.navigate(['/employee-detaill' , { id: idEmp }]);
  }

  InterventionUpdate(interventionUpdate: any){
     console.log(interventionUpdate)
    this.interventionService.updateIntervention(interventionUpdate).subscribe(res => {
     this.notifyService.showSuccess("Update with success !! ","Update");
    });
  }

  deleteIntervention(idIntervention: number){
    this.interventionService.DeleteIntervention(idIntervention).subscribe(res=>{
      this.notifyService.showSuccess("delete success ","delet");
      this.router.navigate(['/intervention']);
    }) 
  }
  openMediumModal( mediumModalContent: any ) {
    this.modalService.open( mediumModalContent );
  }

 //pour get type de reparatoioin

 onForm2NameChange({ target }: {target:any}) {
   this.modal2 = target.value; 
 }

 //pour get letat
 modal3 :string="";
 onForm4NameChange({ target }: {target:any}) {
   this.modal3 = target.value; 
 }

 //pour get only the employee machines

 
 onForm3NameChange({ target }: {target:any}) {
   this.model3 = Number(target.value); 
   console.log("model3",target.value);
   console.log(typeof(this.model3))
 }

}
