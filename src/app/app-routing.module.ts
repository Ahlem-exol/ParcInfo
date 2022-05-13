import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/auth/auth-guard';
import { AuthService } from './pages/auth/auth.service';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { OutputPdfComponent } from './pages/document/output-pdf/output-pdf.component';
import { DetailleEmployeeComponent } from './pages/employee/detaille-employee/detaille-employee.component';
import { ListeEmployeeComponent } from './pages/employee/liste-employee/liste-employee.component';
import { DetailleInterventionComponent } from './pages/intervention/detaille-intervention/detaille-intervention.component';
import { ListeInterventionComponent } from './pages/intervention/liste-intervention/liste-intervention.component';
import { ListeLogicielComponent } from './pages/logiciel/liste-logiciel/liste-logiciel.component';
import { DetailleMachineComponent } from './pages/Machine/detaille-machine/detaille-machine.component';
import { ListeMachineComponent } from './pages/Machine/liste-machine/liste-machine.component';
import { ListeProjectComponent } from './pages/project/liste-project/liste-project.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashbordComponent, canActivate: [AuthGuard] },
  {
    path: 'employee',
    component: ListeEmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee-detaill',
    component: DetailleEmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'machine',
    component: ListeMachineComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'machine-detaill',
    component: DetailleMachineComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'logiciel',
    component: ListeLogicielComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'intervension',
    component: ListeInterventionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'intervension-detaill',
    component: DetailleInterventionComponent,
    canActivate: [AuthGuard],
  },

  // Project
  {
    path: 'Project',
    component: ListeProjectComponent,
    canActivate: [AuthGuard],
  },
  { path: 'document', component: OutputPdfComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService,AuthGuard],
})
export class AppRoutingModule {}
