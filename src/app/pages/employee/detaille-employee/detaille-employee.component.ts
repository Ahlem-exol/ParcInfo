import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Direction } from 'src/app/models/direction.model';
import { Employee } from 'src/app/models/employee.model';
import { DirectionService } from 'src/app/services/direction/direction.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-detaille-employee',
  templateUrl: './detaille-employee.component.html',
  styleUrls: ['./detaille-employee.component.scss']
})
export class DetailleEmployeeComponent implements OnInit {
  
  sub: Subscription;
  loadedEmployee :Employee;

  sub2:Subscription;
  loadedDirections :Direction[];

  updateEmployee :Employee;
  deleteEmployee: Employee;

  constructor(private modalService: NgbModal, private employeeService:EmployeeService
    ,private route: ActivatedRoute,private router: Router, private directionservice :DirectionService
    ,private notifyService : NotificationService) { }

  ngOnInit(): void {
       const idEmp = JSON.parse(this.route.snapshot.paramMap.get('id') || '{}');
       this.sub =  this.employeeService.getEmployee(idEmp).subscribe(empdata => {
        this.loadedEmployee = empdata.employee;})

        this.sub2 = this.directionservice.getDirections().subscribe(dirdata=> {
          this.loadedDirections = dirdata.directions;
        })
  }
  employeeUpdate(updateEmp:Employee){
    console.log(updateEmp.direction.id);
    //updateEmp.reset();
    this.employeeService.UpdateEmp(updateEmp).subscribe(res => {
     this.notifyService.showSuccess("Update with success ","Update");
    });
  }

  deleteEmp(idEmp:number){
    this.employeeService.DeleteEmp(idEmp).subscribe(res=>{
      this.notifyService.showSuccess("delete success ","delet");
      this.router.navigate(['/employee']);
    }) 
    }
    
  openMediumModal( mediumModalContent: any ) {
    this.modalService.open( mediumModalContent );
  }
}
