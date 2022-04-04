import { Injectable, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from './services/notification/notification.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private modalService: NgbModal,private notifyService : NotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.log(error);
        // alert(error.error.message);
        this.notifyService.showSuccess(error.error.message,"errors");

       
        // console.log(this.modalContent.);
        // this.modalService.open(this.modalContent);
        return throwError(error);
      })
    );
    // throw new Error("Method not implemented.");
  }

}
