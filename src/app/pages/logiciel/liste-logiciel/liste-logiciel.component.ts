import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/internal/Subscription';
import { Fournisseur } from 'src/app/models/fournisseur.model';
import { Logiciel } from 'src/app/models/logiciel.model';
import { FournisseurService } from 'src/app/services/fournisseur/fournisseur.service';
import { LogicielService } from 'src/app/services/logiciel/logiciel.service';
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
    { title: 'Indispensables', icon: 'ni-tv-2 text-primary' },
    { title: 'Administration', icon: 'ni-tv-2 text-primary' },
    { title: 'Production', icon: 'ni-tv-2 text-primary' },
    { title: 'Etude', icon: 'ni-tv-2 text-primary' },
    { title: 'Palnification', icon: 'ni-tv-2 text-primary' },
    { title: 'Autre', icon: 'ni-tv-2 text-primary' },
  ];
  comptabiliteListe: type[] = [
    { title: 'All', icon: 'ni-tv-2 text-primary' },
    { title: 'Windows XP', icon: 'ni-tv-2 text-primary' },
    { title: 'Windows 7 32bit', icon: 'ni-tv-2 text-primary' },
    { title: 'Windows 7 64 bit', icon: 'ni-tv-2 text-primary' },
    { title: 'Windows 8 32 bit', icon: 'ni-tv-2 text-primary' },
    { title: 'Windows 8 64 bit', icon: 'ni-tv-2 text-primary' },
    { title: 'Windows 10 32 bit ', icon: 'ni-tv-2 text-primary' },
    { title: 'Windows 10 64 bit ', icon: 'ni-tv-2 text-primary' },
    { title: 'Windows Server ', icon: 'ni-tv-2 text-primary' },
  ];
  name: string;
  sub4: Subscription;
  loadedFournisseur: Fournisseur[];

  sub3: Subscription;
  loadedLogiciels: Logiciel[];
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private logicielService: LogicielService,
    private fournisseurService: FournisseurService,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.sub3 = this.logicielService
      .getLogiciels()
      .subscribe((logicieldata) => {
        this.loadedLogiciels = logicieldata.logiciels;
      });

    this.sub4 = this.fournisseurService
      .getFournisseur()
      .subscribe((fournisseurdata) => {
        this.loadedFournisseur = fournisseurdata.fournisseurs;
      });
  }

  nomLog: any;
  p: number = 1;

  //pour table serach
  Search() {
    if (this.nomLog == '') {
      this.ngOnInit();
    } else {
      this.loadedLogiciels = this.loadedLogiciels.filter((res) => {
        console.log(res.nomLog + '    ' + this.nomLog);
        return (
          res.nomLog
            .toLocaleLowerCase()
            .match(this.nomLog.toLocaleLowerCase()) ||
          res.fournisseur.nomFourni
            .toLocaleLowerCase()
            .match(this.nomLog.toLocaleLowerCase())
        );
      });
    }
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  openMediumModal(mediumModalContent: any) {
    this.modalService.open(mediumModalContent);
  }
  //to gte the name of the logo importe
  getFileDetails(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.name = event.target.files[i].name;
    }
  }

  addLogicile(form: NgForm) {
    const logo = this.name;
    const nomLog = form.value.nomLog;
    const owner = form.value.owner;
    const versionLog = form.value.versionLog;
    const Licence = form.value.Licence;
    const type = form.value.type;
    const comptabilite = form.value.comptabilite;
    const observation = form.value.observation;
    const lienTelechr = form.value.lienTelechr;
    const datedactivation = form.value.datedactivation;
    const datefin = form.value.datefin;
    ////////////////////
    const idForniss = Number(form.value.idForniss);

    // // ajouter machine
    this.logicielService
      .addLogiciel(
        logo,
        nomLog,
        type,
        owner,
        versionLog,
        comptabilite,
        Licence,
        datedactivation,
        datefin,
        lienTelechr,
        observation,
        idForniss
      )
      .subscribe((res) => {
        this.notifyService.showSuccess('Add with success ', 'Add');

        this.ngOnInit();
      });
  }
}
