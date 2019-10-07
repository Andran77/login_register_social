import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from 'ng-social-login-module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user;
  loading = true;

  constructor(private router: Router) { // private authService: AuthService
    if (!localStorage.getItem('current_user')) {
      router.navigate(['/login']);
    } else {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
      const usr = JSON.parse(localStorage.getItem('current_user'));
      this.user = usr.name ? {...usr} : JSON.parse(localStorage.getItem('users')).find(user => user.email === usr.email);
      this.user.name = this.user.name ? this.user.name : this.user.firstName + ' ' + this.user.lastName;
    }
  }

  ngOnInit() {
  }

  exitUser() {
    localStorage.removeItem('current_user');
    this.loading = true;
    // this.authService.signOut();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

  // signOut(): void {
  //   this.authService.signOut();
  // }
}
