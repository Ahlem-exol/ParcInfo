import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Direction } from 'src/app/models/direction.model';
import { Employee } from 'src/app/models/employee.model';
import { Intervention } from 'src/app/models/intervention.model';
import { Logiciel } from 'src/app/models/logiciel.model';
import { Logparinter } from 'src/app/models/logparinter.model';
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
    { title: 'configuration software',  icon: 'ni-tv-2 text-primary'},
    { title: 'Recuperation des données',  icon: 'ni-tv-2 text-primary'},
    { title: 'Assitence',  icon: 'ni-tv-2 text-primary'},
    { title: 'Reparation Hardware ',  icon: 'ni-tv-2 text-primary' },
    { title: 'Reparation port/cablage reseau',  icon: 'ni-tv-2 text-primary'},
  ];

  etat :type[]=[
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

  sub6:Subscription;
  loadedLogicielPeintervention:Logparinter[];
  model3 :number
  modal2:string
  logUp :[];
  lenth: number;

  constructor(private modalService: NgbModal,private interventionService:InterventionService ,private machineService:MachineService ,private employeeService:EmployeeService
    ,private route: ActivatedRoute,private router: Router, private directionservice :DirectionService
    ,private notifyService : NotificationService, private fournisseurService:FournisseurService,private logicielservice:LogicielService) { }

    dropdownList:any[];
    selectedItems :any[];
    dropdownSettings :any = {};

  ngOnInit(): void {
    const idInter = JSON.parse(this.route.snapshot.paramMap.get('id') || '{}');
    this.sub =  this.interventionService.getIntervention(idInter).subscribe(minterdata => {
       this.loaddedIntervention = minterdata.intervention;
       this.model3=this.loaddedIntervention.employee.id ; 
       this.modal2=this.loaddedIntervention.typeInterv;
     })

     this.sub6 =  this.interventionService.getInterventionsPerLogociel().subscribe(interdata => {
      this.loadedLogicielPeintervention = interdata.logparinters;
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
      console.log(this.loaddedIntervention.id)
      console.log(this.loadedLogicielPeintervention)
    
       this.loadedLogiciel = logdata.logiciels;
       this.dropdownList = this.loadedLogiciel;
       this.selectedItems = [];
       this.dropdownSettings= {
         singleSelection: false,
         idField: 'idLog',
         textField: 'nomLog',
         selectAllText: 'Select All',
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 3,
         allowSearchFilter: true
       };
      
     })
  }
  logiciels :any[];
  onItemSelect(item: any) {
    this.logiciels=[];
    this.logiciels= item;
    console.log(item)
  }
  onSelectAll(items: any) {
    this.logiciels=[];
    this.logiciels= items;
    console.log(items)
  }
  unSelect(item:any){
     this.logiciels.forEach((element,index)=>{
       if(this.logiciels[index].idLog == item.idLog ) {
        console.log("Item ["+index+"]: " ,this.logiciels[index].idLog,", unselcted Item :   ",item.idLog, "the equalite ", (this.logiciels[index].idLog == item.idLog ));
         delete this.logiciels[index];
    }
   });
  }
  unSelectAll(items :any){
    this.logiciels=[];
    console.log("inselcted item",items);
  }

  detailleEmployee(idEmp:number){
    this.router.navigate(['/employee-detaill' , { id: idEmp }]);
  }

  InterventionUpdate(interventionUpdate: any){
     console.log("the updzate data  ",interventionUpdate)
    this.interventionService.updateIntervention(interventionUpdate).subscribe(res => {
     this.notifyService.showSuccess("Update with success !! ","Update");
    });
  }


  EtatUpdate(form: NgForm){
    const etat= form.value.etat;
    const dateReparation= form.value.dateReparation;
    const dateFinInter = form.value.dateFinInter;
    const causeEchec= form.value.causeEchec;
    const etatdereparation = form.value.etatdereparation;


  }
  deleteIntervention(idIntervention: number){
    this.interventionService.DeleteIntervention(idIntervention).subscribe(res=>{
      this.notifyService.showSuccess("Delete with success ","delet");
      this.router.navigate(['/intervension']);
    }) 
  }

  updateListeLogiciel( id:number ){

    console.log("logiciel list", this.logiciels.length)
    if(this.logiciels.length == undefined){
      this.lenth= 0;
    }else{
      this.lenth=this.logiciels.length;
    }
   
   this.interventionService.UpdateListeOfLogciel(this.logiciels,id,this.lenth).subscribe(res => {
     this.notifyService.showSuccess("Update with success ","Update");
     this.ngOnInit();
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
