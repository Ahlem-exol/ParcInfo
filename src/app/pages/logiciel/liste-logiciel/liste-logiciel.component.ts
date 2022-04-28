import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FournisseurService } from 'src/app/services/fournisseur/fournisseur.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
declare interface type {
  title: string;
  icon: string;
}
@Component({
  selector: 'app-liste-logiciel',
  templateUrl: './liste-logiciel.component.html',
  styleUrls: ['./liste-logiciel.component.scss'],
})
export class ListeLogicielComponent implements OnInit {
  typeLog: type[] = [
    { title: 'de base', icon: 'ni-tv-2 text-primary' },
    { title: 'Administration', icon: 'ni-tv-2 text-primary' },
    { title: 'Production', icon: 'ni-tv-2 text-primary' },
    { title: 'Etude', icon: 'ni-tv-2 text-primary' },
    { title: 'Palnification', icon: 'ni-tv-2 text-primary' },
    { title: 'Autre', icon: 'ni-tv-2 text-primary' },
  ];
  constructor(
    private modalService: NgbModal,
    private router: Router,

    private fournisseurService: FournisseurService,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {}

  openMediumModal(mediumModalContent: any) {
    this.modalService.open(mediumModalContent);
  }
  addLogicile(form: NgForm) {
    // const categorieMach = form.value.categorieMach;
    // const typeMach = form.value.typeMach;
    // const marqueMach = form.value.marqueMach;
    // const numSerie = form.value.numSerie;
    // const numAlrim = form.value.numAlrim;
    // const date_entre = form.value.date_entre;
    // const date_affectation = form.value.date_affectation;
    // const date_reforme = form.value.date_reforme;
    // const cause = form.value.cause;
    // const observation = form.value.observation;
    // const Emplacement = form.value.Emplacement;
    // const etat = form.value.etat;
    // var idForniss = Number(form.value.idForniss);
    // //est un fournisseur inconnu
    // if (!idForniss) {
    //   idForniss = 4;
    // }
    // var idEmp = Number(form.value.idEmp.split(',')[0]);
    // var idDir = Number(form.value.idEmp.split(',')[1]);
    // // console.log();
    // // ajouter machine
    // this.machineService
    //   .addMachine(
    //     categorieMach,
    //     typeMach,
    //     marqueMach,
    //     numSerie,
    //     numAlrim,
    //     date_entre,
    //     date_affectation,
    //     date_reforme,
    //     cause,
    //     observation,
    //     Emplacement,
    //     etat,
    //     idDir,
    //     idForniss,
    //     idEmp
    //   )
    //   .subscribe((res) => {
    //     this.notifyService.showSuccess('Add with success ', 'Add');
    //     if (etat == 'Affecte') {
    //       this.router.navigate([
    //         '/document',
    //         {
    //           Type: 'Decharge',
    //           idEmp: idEmp,
    //           typeMach: typeMach,
    //           marqueMach: marqueMach,
    //           numAlrim: numAlrim,
    //         },
    //       ]);
    //     }
    //     this.ngOnInit();
    //   });
  }
}
