import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Direction } from 'src/app/models/direction.model';
import { Fournisseur } from 'src/app/models/fournisseur.model';
import { Logiciel } from 'src/app/models/logiciel.model';
import { LogParDir } from 'src/app/models/LogParDir.model';
import { DirectionService } from 'src/app/services/direction/direction.service';
import { FournisseurService } from 'src/app/services/fournisseur/fournisseur.service';
import { LogicielService } from 'src/app/services/logiciel/logiciel.service';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit,OnDestroy {

   sub: Subscription;
   loadedDirections :Direction[];

   sub2: Subscription;
   loadedFournisseur :Fournisseur[];

   sub3: Subscription;
   loadedLogiciel :Logiciel[];

   sub4: Subscription;
   loadedlogpardir :LogParDir[];


  constructor(private modalService: NgbModal,private directionService:DirectionService,
    private router: Router,private route: ActivatedRoute, private FournisseurService:FournisseurService,private logicielService:LogicielService) { }
  ngOnDestroy(): void {
   this.sub.unsubscribe();
   this.sub2.unsubscribe();
   this.sub3.unsubscribe();
   this.sub4.unsubscribe();
   
  }

  ngOnInit(): void {

    this.sub =  this.directionService.getDirections().subscribe(dirdata => {
       this.loadedDirections = dirdata.directions;
     });
    this.sub2 = this.FournisseurService.getFournisseur().subscribe(fourdata=>{
      this.loadedFournisseur = fourdata.fournisseurs;
    })

    this.sub3 = this.logicielService.getLogiciels().subscribe(fourdata=>{
      this.loadedLogiciel = fourdata.logiciels;
    })
  
    this.sub4 = this.logicielService.getLogPaDir().subscribe(fourdata=>{
      this.loadedlogpardir = fourdata.logpardirs;
    })
    console.log("logicie par direction",this.loadedlogpardir)
  }

}
