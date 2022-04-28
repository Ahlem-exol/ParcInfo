import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Direction } from 'src/app/models/direction.model';
import { Employee } from 'src/app/models/employee.model';
import { Fournisseur } from 'src/app/models/fournisseur.model';
import { Hard } from 'src/app/models/hard.model';
import { Machine } from 'src/app/models/machine.model';
import { Network } from 'src/app/models/network.model';
import { DirectionService } from 'src/app/services/direction/direction.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { FournisseurService } from 'src/app/services/fournisseur/fournisseur.service';
import { MachineService } from 'src/app/services/machine/machine.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

declare interface type {
  title: string;
  icon: string;
}

@Component({
  selector: 'app-detaille-machine',
  templateUrl: './detaille-machine.component.html',
  styleUrls: ['./detaille-machine.component.scss'],
})
export class DetailleMachineComponent implements OnInit {
  sub: Subscription;
  loadedMachine: Machine;

  sub2: Subscription;
  loadedDirections: Direction[];

  sub3: Subscription;
  loadedEmployee: Employee[];

  sub4: Subscription;
  loadedFournisseur: Fournisseur[];

  sub5: Subscription;
  loadedhardData: Hard;

  sub6: Subscription;
  loadedNetworkData: Network;

  modal2: String = '';
  stat: String = '';

  etat: type[] = [
    { title: 'En Stock', icon: 'ni-tv-2 text-primary' },
    { title: 'Affecte', icon: 'ni-tv-2 text-primary' },
    { title: 'En Reparation', icon: 'ni-tv-2 text-primary' },
    { title: 'En reforme', icon: 'ni-tv-2 text-primary' },
  ];
  categorieMateriel: type[] = [
    { title: 'User Machine', icon: 'ni-tv-2 text-primary' },
    { title: 'Reseau Materile', icon: 'ni-tv-2 text-primary' },
    { title: 'Pointeusse', icon: 'ni-tv-2 text-primary' },
    { title: 'CNC Machine', icon: 'ni-tv-2 text-primary' },
    { title: 'Armoir reseau', icon: 'ni-tv-2 text-primary' },
    { title: 'Armoir camera', icon: 'ni-tv-2 text-primary' },
    { title: 'Other', icon: 'ni-tv-2 text-primary' },
  ];
  // user machines
  type1: type[] = [
    { title: 'Unite', icon: 'ni-tv-2 text-primary' },
    { title: 'Moniteur', icon: 'ni-tv-2 text-primary' },
    { title: 'Laptop', icon: 'ni-tv-2 text-primary' },
    { title: 'Imprement', icon: 'ni-tv-2 text-primary' },
    { title: 'Scanner', icon: 'ni-tv-2 text-primary' },
    { title: 'Multifonction', icon: 'ni-tv-2 text-primary' },
    { title: 'Clavier', icon: 'ni-tv-2 text-primary' },
    { title: 'Souris', icon: 'ni-tv-2 text-primary' },
    { title: 'Ondeleur', icon: 'ni-tv-2 text-primary' },
  ];
  // reseaux materile
  type2: type[] = [
    { title: 'serveur', icon: 'ni-tv-2 text-primary' },
    { title: 'switch', icon: 'ni-tv-2 text-primary' },
    { title: 'convertissuer', icon: 'ni-tv-2 text-primary' },
    { title: 'ondeleur', icon: 'ni-tv-2 text-primary' },
    { title: 'routeur', icon: 'ni-tv-2 text-primary' },
    { title: 'modem', icon: 'ni-tv-2 text-primary' },
    { title: 'fibre et cable', icon: 'ni-tv-2 text-primary' },
    { title: 'pare_fue', icon: 'ni-tv-2 text-primary' },
    { title: 'Ondeleur', icon: 'ni-tv-2 text-primary' },
  ];
  // reseaux materile
  composente: type[] = [
    { title: 'switch', icon: 'ni-tv-2 text-primary' },
    { title: 'convertissuer', icon: 'ni-tv-2 text-primary' },
    { title: 'ondeleur', icon: 'ni-tv-2 text-primary' },
    { title: 'fibre et cable', icon: 'ni-tv-2 text-primary' },
    { title: 'pare_fue', icon: 'ni-tv-2 text-primary' },
    { title: 'Ondeleur', icon: 'ni-tv-2 text-primary' },
  ];

  typeNull: type[] = [
    {
      title: 'Pas des composent au des sos materiel',
      icon: 'ni-tv-2 text-primary',
    },
  ];

  // typeWindows
  typeWindows: type[] = [
    { title: 'Windows XP', icon: 'ni-tv-2 text-primary' },
    { title: 'Windows 7', icon: 'ni-tv-2 text-primary' },
    { title: 'Windows 8', icon: 'ni-tv-2 text-primary' },
    { title: 'Windows 10', icon: 'ni-tv-2 text-primary' },
    { title: 'Unix', icon: 'ni-tv-2 text-primary' },
    { title: 'Windows server 2016', icon: 'ni-tv-2 text-primary' },
    { title: 'Windows Server 2012', icon: 'ni-tv-2 text-primary' },
    { title: 'Windows 11', icon: 'ni-tv-2 text-primary' },
  ];

  DNSDomain: type[] = [
    { title: 'Alrim.dz', icon: 'ni-tv-2 text-primary' },
    { title: 'WorkGroup', icon: 'ni-tv-2 text-primary' },
    { title: 'alrim.spa.local', icon: 'ni-tv-2 text-primary' },
    { title: 'Other', icon: 'ni-tv-2 text-primary' },
  ];

  VPNConfig: type[] = [
    { title: 'OUI', icon: 'ni-tv-2 text-primary' },
    { title: 'NON', icon: 'ni-tv-2 text-primary' },
  ];

  ConfigOutlook: type[] = [
    { title: 'OUI/PC', icon: 'ni-tv-2 text-primary' },
    { title: 'OUI/Telephone', icon: 'ni-tv-2 text-primary' },
    { title: 'OUI/PC et Telephone', icon: 'ni-tv-2 text-primary' },
    { title: 'OUI/PC et laptop et Telephone', icon: 'ni-tv-2 text-primary' },
    { title: 'NON', icon: 'ni-tv-2 text-primary' },
  ];
  constructor(
    private modalService: NgbModal,
    private machineService: MachineService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private directionservice: DirectionService,
    private notifyService: NotificationService,
    private fournisseurService: FournisseurService
  ) {}

  ngOnInit(): void {
    const idMach = JSON.parse(this.route.snapshot.paramMap.get('id') || '{}');
    this.sub = this.machineService
      .getmachine(idMach)
      .subscribe((machinedata) => {
        this.loadedMachine = machinedata.machine;
        this.modal2 = machinedata.machine.categorieMach;
        console.log(this.loadedMachine);
      });

    this.sub5 = this.machineService
      .GetHardData(idMach)
      .subscribe((machinedata) => {
        this.loadedhardData = machinedata.HardInfo;
        console.log(this.loadedhardData);
      });

    this.sub6 = this.machineService
      .GetNetworkData(idMach)
      .subscribe((NetworkInfo) => {
        this.loadedNetworkData = NetworkInfo.NetworkData;
        console.log(this.loadedNetworkData);
      });

    this.sub2 = this.directionservice
      .getDirections()
      .subscribe((directiondata) => {
        this.loadedDirections = directiondata.directions;
      });

    this.sub3 = this.employeeService
      .getEmployees()
      .subscribe((employeedata) => {
        this.loadedEmployee = employeedata.employees;
      });

    this.sub4 = this.fournisseurService
      .getFournisseur()
      .subscribe((fournisseurdata) => {
        this.loadedFournisseur = fournisseurdata.fournisseurs;
      });
  }

  onForm2NameChange({ target }: { target: any }) {
    this.modal2 = target.value;
    console.log(target.value);
  }

  MachineUpdate(loadedMachine: any) {
    if (this.stat != '') {
      loadedMachine.etat = this.stat;
    }
    console.log(loadedMachine);

    // this.machineService.updateMachine(loadedMachine).subscribe((res) => {
    //   this.notifyService.showSuccess('Update with success ', 'Update');

    //   if (loadedMachine.etat == 'Affecte') {
    //     console.log(
    //       loadedMachine.employee.id,
    //       loadedMachine.marqueMach,
    //       loadedMachine.typeMach,
    //       loadedMachine.numAlrim
    //     );
    //     this.router.navigate([
    //       '/document',
    //       {
    //         Type: 'Decharge',
    //         idEmp: loadedMachine.employee.id,
    //         typeMach: loadedMachine.marqueMach,
    //         marqueMach: loadedMachine.typeMach,
    //         numAlrim: loadedMachine.numAlrim,
    //       },
    //     ]);
    //   }
    // });
  }

  deleteMachine(idMach: number) {
    // this.machineService.DeleteMachine(idMach).subscribe(res=>{
    //   this.notifyService.showSuccess("delete success ","delet");
    //   this.router.navigate(['/machine']);
    // })
    this.router.navigate(['/machine']);
  }

  openMediumModal(mediumModalContent: any) {
    this.modalService.open(mediumModalContent);
  }

  openMediumModalStat(mediumModalContent: any, stat: string) {
    this.modalService.open(mediumModalContent);
    this.stat = stat;
    console.log(stat);
  }

  detailleEmployee(idEmp: number) {
    this.router.navigate(['/employee-detaill', { id: idEmp }]);
  }

  addHard(form: NgForm) {
    const RAM = form.value.RAM;
    const Processor = form.value.Processor;
    const CarteGraphique = form.value.CarteGraphique;
    const Appphoto = form.value.Appphoto;
    const espaceStokage = form.value.espaceStokage;
    const Bluetouth = form.value.Bluetouth;
    const cartReseau = form.value.cartReseau;
    const cartReseau2 = form.value.cartReseau2;
    const cartReseau3 = form.value.cartReseau3;

    const idMach = Number(
      JSON.parse(this.route.snapshot.paramMap.get('id') || '{}')
    );

    this.machineService
      .addHard(
        RAM,
        Processor,
        CarteGraphique,
        Appphoto,
        espaceStokage,
        Bluetouth,
        cartReseau,
        cartReseau2,
        cartReseau3,
        idMach
      )
      .subscribe((res) => {
        this.notifyService.showSuccess('Add with success ', 'Add');
        this.ngOnInit();
      });
  }

  addNetwork(form: NgForm) {
    const macAdd = form.value.macAdd;
    const nomMach = form.value.nomMach;
    const DNSDomain = form.value.DNSDomain;
    const sessionReseau = form.value.sessionReseau;
    const VPNConfig = form.value.VPNConfig;
    const sessionLocal = form.value.sessionLocal;
    const mdpsSessionLocal = form.value.mdpsSessionLocal;
    const observation = form.value.observation;
    const outlook = form.value.outlook;
    const idMach = Number(
      JSON.parse(this.route.snapshot.paramMap.get('id') || '{}')
    );

    this.machineService
      .addNetwork(
        macAdd,
        outlook,
        nomMach,
        DNSDomain,
        sessionReseau,
        VPNConfig,
        sessionLocal,
        mdpsSessionLocal,
        observation,
        idMach
      )
      .subscribe((res) => {
        this.notifyService.showSuccess('Add with success ', 'Add');
        this.ngOnInit();
      });
  }
}
