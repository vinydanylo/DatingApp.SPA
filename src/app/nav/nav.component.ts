import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
    this.alertifyService.success('logged in succesfully');
   }, error => {
    this.alertifyService.error(error);
   });
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertifyService.message('logged out');
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
