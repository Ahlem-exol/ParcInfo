import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  isLoading = false;
  isLogin = true;
  nameUser:string ='';
  constructor(private authService: AuthService,private notifyService : NotificationService, private router: Router, private modalService: NgbModal) { }
 

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }

 onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const mail = form.value.mail;
    const password = form.value.password;
    //inscrition
    if (!this.isLogin) {
     
      const name = form.value.name;
      const confirmationPassword = form.value.confirmationPassword;
      this.nameUser=name;
     
      this.isLoading = true;
      this.authService.createUser(mail, name, password)
        .subscribe(result => {
          this.isLoading = !this.isLoading;
          console.log(result)
          this.notifyService.showSuccess( result.message,"login");

          this.isLogin = !this.isLogin;
          form.reset();
        }, error => {
          this.isLoading = !this.isLoading;
        });
    } else {
      // login
      this.isLoading = true;
      this.authService.login(mail, password).subscribe(result => {
        
       
        this.isLoading = !this.isLoading;
      }, error => {
        console.log(error.error.message);
        this.isLoading = !this.isLoading;
      });
      form.reset();
    }
    this.router.navigateByUrl('\home');
  }

  login() {
    this.router.navigateByUrl('\home')
  }

}
