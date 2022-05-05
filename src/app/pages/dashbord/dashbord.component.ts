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
// for the charts 
import {Chart} from 'chart.js';
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

    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {},
      },
    });
  }

}
