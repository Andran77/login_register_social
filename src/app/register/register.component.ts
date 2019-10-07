import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpForm: FormGroup;
  isTextFieldType = true;
  emailPattern = /[a-zA-Z0-9!#$%&'"*+-\/=?^_`{|}~.,:;<>@\[\\\]]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/;
  birthDatePattern = /^([1-9]|1[0-9]|2[0-9]|3[0-1])\/([1-9]|1[0-2])\/(19[0-9][0-9]|20[0-9][0-9])$/;


  constructor(private router: Router, private formBuilder: FormBuilder, public dialog: MatDialog) {
    if (localStorage.getItem('current_user')) {
      router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ),
      lastName: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ),
      birthDay: new FormControl(
        null,
        [
          Validators.required,
          // Validators.minLength(8),
          // Validators.pattern(this.birthDatePattern)
        ]
      ),
      email: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern(this.emailPattern)
        ]
      ),
      password: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(6)
        ]
      )
    });
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  changePassType() {
    if (this.signUpForm.value.password) {
      this.isTextFieldType = !this.isTextFieldType;
    } else {
      this.isTextFieldType = false;
    }
  }

  valuechange(event) {
    if (!event.target.value) {
      this.isTextFieldType = false;
    }
  }

  onSignUp() {
    const errorText = [];
    if (this.signUpForm.valid) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const age = this.calculateAge(this.signUpForm.get('birthDay').value);
      const user = {
        email: this.signUpForm.get('email').value.toLowerCase(),
        password: this.signUpForm.get('password').value,
        birthDay: this.signUpForm.get('birthDay').value,
        firstName: this.signUpForm.get('firstName').value,
        lastName: this.signUpForm.get('lastName').value,
      };
      const usr = users.find(us => us.email === user.email);
      if (usr) {
        errorText.push('Email address already exists!');
      }
      if (age < 18) {
        errorText.push('User age cannot be less than 18 years!');
      }
      if (!errorText.length) {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('current_user', JSON.stringify(user));
        this.router.navigate(['/home']);
      } else {
        let err = '';
        errorText.map(er => err = err ? err + '\n' + er : er);
        alert(err);
      }
    }
  }

  // ageCalculator(date) {
  //   if (date) {
  //     const birth = new Date(date);
  //     const curr  = new Date();
  //     const diff = curr.getTime() - birth.getTime();
  //     console.log(Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)));
  //   } else {
  //     console.log(0);
  //   }
  // }

  calculateAge(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
