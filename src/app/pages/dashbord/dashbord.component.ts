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
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Charts } from 'src/app/models/charts.model';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss'],
})
export class DashbordComponent implements OnInit, OnDestroy {
  sub: Subscription;
  loadedDirections: Direction[];

  sub2: Subscription;
  loadedFournisseur: Fournisseur[];

  sub3: Subscription;
  loadedLogiciel: Logiciel[];

  sub4: Subscription;
  loadedlogpardir: LogParDir[];

  sub5: Subscription;
  loadedChart: Charts[];

  constructor(
    private modalService: NgbModal,
    private directionService: DirectionService,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private FournisseurService: FournisseurService,
    private logicielService: LogicielService
  ) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
  }

  ngOnInit(): void {
    this.sub2 = this.FournisseurService.getFournisseur().subscribe(
      (fourdata) => {
        this.loadedFournisseur = fourdata.fournisseurs;
      }
    );

    this.sub3 = this.logicielService.getLogiciels().subscribe((fourdata) => {
      this.loadedLogiciel = fourdata.logiciels;
    });

    this.sub4 = this.logicielService.getLogPaDir().subscribe((fourdata) => {
      this.loadedlogpardir = fourdata.logpardirs;
    });
    this.sub5 = this.employeeService.getCountEmp().subscribe(() => {
      this.sub = this.directionService.getDirections().subscribe((dirdata) => {
        this.loadedDirections = dirdata.directions;

        let labelsD: string[] = [];
        let dataD: number[] = [];
        this.loadedDirections.forEach(function (item) {
          // convert table iddirection to nom direction
          labelsD.push(item.nom);
          dataD.push(item.nbrEmp);
        });
        console.log(labelsD);
        console.log(dataD);
        const myChart = new Chart('myChart', {
          type: 'bar',
          data: {
            //get frome table emlpoyee count nombre des employee per direction
            // lable liste des direction
            labels: labelsD,
            datasets: [
              {
                label: '# of Employees',
                // je doit mete mon data
                data: dataD,

                backgroundColor: [
                  '#05c3fb',
                  '#05c3fb',
                  '#05c3fb',
                  '#05c3fb',
                  '#05c3fb',
                  '#05c3fb',
                  '#05c3fb',
                  '#05c3fb',
                  '#05c3fb',
                  '#05c3fb',
                ],
                borderColor: [
                  '#05c3fb',
                  '#05c3fb',
                  '#05c3fb',
                  '#05c3fb',
                  '#05c3fb',
                  '#05c3fb',
                  '#05c3fb',
                  '#05c3fb',
                  '#05c3fb',
                  '#05c3fb',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {},
          },
        });
      });
    });
  }
}
