import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Direction } from 'src/app/models/direction.model';
import { Employee } from 'src/app/models/employee.model';
import { Fournisseur } from 'src/app/models/fournisseur.model';
import { Machine } from 'src/app/models/machine.model';
import { DirectionService } from 'src/app/services/direction/direction.service';
import { DocumentService } from 'src/app/services/document/document.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { FournisseurService } from 'src/app/services/fournisseur/fournisseur.service';
import { MachineService } from 'src/app/services/machine/machine.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

declare interface type {
  title: string;
  icon: string;
}
@Component({
  selector: 'app-liste-machine',
  templateUrl: './liste-machine.component.html',
  styleUrls: ['./liste-machine.component.scss']
})

export class ListeMachineComponent implements OnInit,OnDestroy {
  sub: Subscription;
  loaddedMachine : Machine[];

  sub2:Subscription;
  loadedDirections :Direction[];
  
  sub3:Subscription;
  loadedEmployee :Employee[];

  sub4:Subscription;
  loadedFournisseur :Fournisseur[];
  
  modal2:string="";
  stat:String="";
  etat : type[]=[
    { title: 'En Stock',  icon: 'ni-tv-2 text-primary'},
    { title: 'Affecte',  icon: 'ni-tv-2 text-primary'},
    { title: 'En Reparation',  icon: 'ni-tv-2 text-primary'},
    { title: 'En reforme',  icon: 'ni-tv-2 text-primary'}];
  categorieMateriel :type[]=[
    { title: 'User Machine',  icon: 'ni-tv-2 text-primary'},
    { title: 'Reseau Materile',  icon: 'ni-tv-2 text-primary'},
    { title: 'Pointeusse',  icon: 'ni-tv-2 text-primary'},
    { title: 'CNC Machine',  icon: 'ni-tv-2 text-primary'},
    { title: 'Armoir reseau',  icon: 'ni-tv-2 text-primary'},
    { title: 'Armoir camera',  icon: 'ni-tv-2 text-primary'},
    { title: 'Other',  icon: 'ni-tv-2 text-primary'}];
  // user machines
  type1 :type[]=[
    { title: 'Unite',  icon: 'ni-tv-2 text-primary'},
    { title: 'Moniteur',  icon: 'ni-tv-2 text-primary'},
    { title: 'Laptop',  icon: 'ni-tv-2 text-primary'},
    { title: 'Imprement',  icon: 'ni-tv-2 text-primary'},
    { title: 'Scanner',  icon: 'ni-tv-2 text-primary'},
    { title: 'Multifonction',  icon: 'ni-tv-2 text-primary'},
    { title: 'Clavier',  icon: 'ni-tv-2 text-primary'},
    { title: 'Souris',  icon: 'ni-tv-2 text-primary'},
    { title: 'Ondeleur',  icon: 'ni-tv-2 text-primary'}
  ];
  // reseaux materile
  type2:type[]=[
    { title: 'serveur',  icon: 'ni-tv-2 text-primary'},
    { title: 'switch',  icon: 'ni-tv-2 text-primary'},
    { title: 'convertissuer',  icon: 'ni-tv-2 text-primary'},
    { title: 'ondeleur',  icon: 'ni-tv-2 text-primary'},
    { title: 'routeur',  icon: 'ni-tv-2 text-primary'},
    { title: 'modem',  icon: 'ni-tv-2 text-primary'},
    { title: 'fibre et cable',  icon: 'ni-tv-2 text-primary'},
    { title: 'pare_fue',  icon: 'ni-tv-2 text-primary'},
    { title: 'Ondeleur',  icon: 'ni-tv-2 text-primary'}
  ];
  // reseaux materile
  composente:type[]=[
    { title: 'switch',  icon: 'ni-tv-2 text-primary'},
    { title: 'convertissuer',  icon: 'ni-tv-2 text-primary'},
    { title: 'ondeleur',  icon: 'ni-tv-2 text-primary'},
    { title: 'fibre et cable',  icon: 'ni-tv-2 text-primary'},
    { title: 'pare_fue',  icon: 'ni-tv-2 text-primary'},
    { title: 'Ondeleur',  icon: 'ni-tv-2 text-primary'}
  ];
  date= new Date();
  typeNull:type[]=[
    { title: 'Pas des composent au des sos materiel',  icon: 'ni-tv-2 text-primary'},
  ];
  constructor(private modalService: NgbModal,private machineService :MachineService ,private employeeService:EmployeeService,private router: Router,
    private directionservice :DirectionService, private documentService:DocumentService,private fournisseurService:FournisseurService, private notifyService :NotificationService) { }
  ngOnDestroy(): void {
   this.sub.unsubscribe();
   this.sub2.unsubscribe();
   this.sub3.unsubscribe();
   this.sub4.unsubscribe();
  }

  ngOnInit(): void {
    this.sub =  this.machineService.getMachines().subscribe(machdata => {
      console.log(machdata.machines);
       this.loaddedMachine = machdata.machines;
     })

     
    this.sub2 = this.directionservice.getDirections().subscribe(directiondata =>{
      this.loadedDirections = directiondata.directions;
    })

    this.sub3 = this.employeeService.getEmployees().subscribe(employeedata =>{
    this.loadedEmployee = employeedata.employees;
   })

  this.sub4 = this.fournisseurService.getFournisseur().subscribe(fournisseurdata =>{
  this.loadedFournisseur = fournisseurdata.fournisseurs;
   })
  }

  detaille(machine:string){
    this.router.navigate(['/machine-detaill' , { id: machine }]);
  }

  openMediumModal( mediumModalContent: any ) {
    this.modalService.open( mediumModalContent );
  }
  numSerie:any;
  p:number = 1;
  
  //pour table serach 
  Search(){
    if(this.numSerie == ""){
      this.ngOnInit();
    }else{
      this.loaddedMachine = this.loaddedMachine.filter(res =>{
        return res.numSerie == this.numSerie;
      })
    }
  }

  key: string = 'id';
  reverse: boolean= false;
  sort(key: any){
    this.key = key;
    this.reverse = !this.reverse;
  }
  
  addMachine(form: NgForm){
    const categorieMach= form.value.categorieMach;
    const typeMach= form.value.typeMach;
    const marqueMach =form.value.marqueMach;
    const numSerie = form.value.numSerie;
    const numAlrim = form.value.numAlrim;
    const date_entre = form.value.date_entre;
    const date_affectation = form.value.date_affectation;
    const date_reforme=  form.value.date_reforme;
    const cause = form.value.cause;
    const observation = form.value.observation;
    const Emplacement =  form.value.Emplacement;
    const etat = form.value.etat;
    var idDir = Number(form.value.idDir);
     if (!idDir){
       idDir = 1;
     }
     var idForniss = Number(form.value.idForniss);
    if (!idForniss){
       idForniss = 1;
       }
       var idEmp = Number(form.value.idEmp);
    if (!idEmp){
       idEmp = 1;
       }
       console.log(idEmp)

       // ajouter machine
    this.machineService.addMachine(categorieMach, typeMach, marqueMach,numSerie,numAlrim,
    date_entre,date_affectation,date_reforme,cause,observation,
     Emplacement,etat,idDir,idForniss,idEmp).subscribe(res => {
      this.notifyService.showSuccess("Add with success ","Add");
      if(etat =="Affecte"){
        //  this.documentService.addDocument("Decharge", "", descreption,idEmp,idForniss,
        //   idInterv:number,idDir:number,idPro:number,dateSortie).subscribe(res=>{

        //  })
        this.router.navigate(['/document',{ Type:'Decharge',idEmp:idEmp, typeMach:typeMach,marqueMach:marqueMach,numAlrim:numAlrim } ]);
      }
     this.ngOnInit();
  })

  }
  onForm2NameChange({ target }: {target:any}) {
    this.modal2 = target.value; 
    console.log(target.value);
  }
  onFormNameChange({ target }: {target:any}) {
    this.stat =target.value;
  }

}
