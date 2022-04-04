import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ListeMachineComponent } from './pages/Machine/liste-machine/liste-machine.component';
import { DetailleMachineComponent } from './pages/Machine/detaille-machine/detaille-machine.component';
import { ListeInterventionComponent } from './pages/intervention/liste-intervention/liste-intervention.component';
import { DetailleInterventionComponent } from './pages/intervention/detaille-intervention/detaille-intervention.component';
import { ListeEmployeeComponent } from './pages/employee/liste-employee/liste-employee.component';
import { DetailleEmployeeComponent } from './pages/employee/detaille-employee/detaille-employee.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FournisseurComponent } from './pages/fournisseur/fournisseur/fournisseur.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { OutputPdfComponent } from './pages/document/output-pdf/output-pdf.component';
import { HeaderPdfComponent } from './pages/document/header-pdf/header-pdf.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { ListeLogicielComponent } from './pages/logiciel/liste-logiciel/liste-logiciel.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthInterceptor } from './pages/auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
// import {authInterceptoreProviders} from './_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HeaderComponent,
    DashbordComponent,
    ListeEmployeeComponent,
    DetailleEmployeeComponent,
    ListeMachineComponent,
    DetailleMachineComponent,
    ListeInterventionComponent,
    DetailleInterventionComponent,
    ListeLogicielComponent,
    FournisseurComponent,
    OutputPdfComponent,
    HeaderPdfComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule, 
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    ReactiveFormsModule,
    PdfViewerModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
 
  providers:
  [
    NgbModule, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
