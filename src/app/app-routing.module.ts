import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { OutputPdfComponent } from './pages/document/output-pdf/output-pdf.component';
import { DetailleEmployeeComponent } from './pages/employee/detaille-employee/detaille-employee.component';
import { ListeEmployeeComponent } from './pages/employee/liste-employee/liste-employee.component';
import { DetailleInterventionComponent } from './pages/intervention/detaille-intervention/detaille-intervention.component';
import { ListeInterventionComponent } from './pages/intervention/liste-intervention/liste-intervention.component';
import { DetailleMachineComponent } from './pages/Machine/detaille-machine/detaille-machine.component';
import { ListeMachineComponent } from './pages/Machine/liste-machine/liste-machine.component';

const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: DashbordComponent },
  {path:'employee', component:ListeEmployeeComponent},
  {path:'employee-detaill', component:DetailleEmployeeComponent},
  {path:'machine', component:ListeMachineComponent},
  {path:'machine-detaill', component:DetailleMachineComponent},
  {path:'intervension', component:ListeInterventionComponent},
  {path:'intervension-detaill', component:DetailleInterventionComponent},
  {path:'document', component: OutputPdfComponent},
  // {path:'document-detaill', component:DetailleDocumentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
