import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   nameUser:any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.nameUser=this.authService.getAuthData()?.name; 
    console.log ("we arein the header components  :  ", this.authService.getAuthData());
  }

  redirectToHome() {
    this.router.navigateByUrl('/home');
  }
  redirectToAbout() {
    this.router.navigateByUrl('');
  }
  onLogout() {
    this.authService.logout();
  }

  getdata(){
   console.log (this.authService.getAuthData());
  }
  isHomeRoute() {
    //console.log(this.router.url);
    return this.router.url === '/home';
  }
}
