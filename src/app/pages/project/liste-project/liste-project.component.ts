import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Direction } from 'src/app/models/direction.model';
import { Employee } from 'src/app/models/employee.model';
import { DirectionService } from 'src/app/services/direction/direction.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';

import { EmpExcel } from 'src/app/models/EmpExcel.model';
import { Produit } from 'src/app/models/produit.model';

declare interface type {
  title: string;
  icon: string;
}
@Component({
  selector: 'app-liste-project',
  templateUrl: './liste-project.component.html',
  styleUrls: ['./liste-project.component.scss'],
})
export class ListeProjectComponent implements OnInit {
  modal1: string = '';
  modal2: string = '';
  sub: Subscription;
  AddEmployee: Employee;
  loadedEmployees: Employee[];
  idDirection: number;
  loadedDirection: Direction;
  TypesDemande: type[] = [
    { title: 'Achat Matériel', icon: 'ni-tv-2 text-primary' }, // serveur, camera ..., ici  je soit mettre l'ajouter materiels
    {
      title: 'Achat Logiciel',
      icon: 'ni-tv-2 text-primary',
    }, // internet, licence Kespersky.., ajouter licence de quele logiciel

    {
      title: 'Achat Licence',
      icon: 'ni-tv-2 text-primary',
    },
    {
      title: 'Achat Abonnement',
      icon: 'ni-tv-2 text-primary',
    },
    { title: 'Achat Service', icon: 'ni-tv-2 text-primary' }, //configuration , instakllation  (materiel, logiciel)
    { title: 'Demande Fourniteur', icon: 'ni-tv-2 text-primary' }, //intene , saisi
  ];
  data: EmpExcel[];
  sub2: Subscription;
  loadedDirections: Direction[];
  produits: Produit[] = [];
  produit: Produit;
  constructor(
    private modalService: NgbModal,
    private employeeService: EmployeeService,
    private router: Router,
    private directionservice: DirectionService
  ) {}

  ngOnInit(): void {
    this.sub = this.employeeService.getEmployees().subscribe((empdata) => {
      console.log(empdata.employees);
      this.loadedEmployees = empdata.employees;
    });

    this.sub2 = this.directionservice.getDirections().subscribe((dirdata) => {
      console.log(dirdata.directions);
      this.loadedDirections = dirdata.directions;
    });
  }

  onChangeDemande({ target }: { target: any }) {
    this.modal1 = target.value;
    console.log(target.value);
  }

  //////// Add Produit
  addProduit(form: NgForm) {
    const Quantite = form.value.Quantite;
    const Designation = form.value.Designation;
    const id = 1;
    this.produit = {
      id: id,
      Quantite: Quantite,
      Designation: Designation,
    };

    this.produits.push(this.produit);
  }

  /////////////////////:::add user
  onSubmit(form: NgForm) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }
  //ajouter model
  openMediumModal(mediumModalContent: any) {
    this.modalService.open(mediumModalContent);
  }
  nom: any;
  p: number = 1;

  //pour table serach
  Search() {
    if (this.nom == '') {
      this.ngOnInit();
    } else {
      this.loadedEmployees = this.loadedEmployees.filter((res) => {
        console.log(res.nom + '    ' + this.nom);
        return (
          res.direction.nom
            .toLocaleLowerCase()
            .match(this.nom.toLocaleLowerCase()) ||
          res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) ||
          res.prenom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) ||
          res.post.toLocaleLowerCase().match(this.nom.toLocaleLowerCase())
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

  detaille(employee: string) {
    console.log('ID employee est ' + employee);
    // sand id in the url
    this.router.navigate(['/employee-detaill', { id: employee }]);
  }
}
