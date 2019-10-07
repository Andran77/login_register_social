import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthService, FacebookLoginProvider, SocialUser,
  GoogleLoginProvider, LinkedinLoginProvider } from 'ng-social-login-module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  signInForm: FormGroup;
  isTextFieldType = true;
  emailPattern = /[a-zA-Z0-9!#$%&'"*+-\/=?^_`{|}~.,:;<>@\[\\\]]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/;
  email = new FormControl(
    null,
    [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern(this.emailPattern)
    ]
  );
  password = new FormControl(
    null,
    [
      Validators.required,
      Validators.minLength(8)
    ]
  );
  errorText = {
    email: 'Enter a valid email',
    password: 'Enter a valid password'
  };

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer
              // private authService: AuthService
  ) {
    iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('assets/image/facebook_icon.svg'));
    iconRegistry.addSvgIcon('linkedin', sanitizer.bypassSecurityTrustResourceUrl('assets/image/linkedin_icon.svg'));
    iconRegistry.addSvgIcon('google', sanitizer.bypassSecurityTrustResourceUrl('assets/image/google_icon.svg'));
    iconRegistry.addSvgIcon('twitter', sanitizer.bypassSecurityTrustResourceUrl('assets/image/twitter_icon.svg'));
    iconRegistry.addSvgIcon('vk', sanitizer.bypassSecurityTrustResourceUrl('assets/image/vk_icon.svg'));
    iconRegistry.addSvgIcon('codeep', sanitizer.bypassSecurityTrustResourceUrl('assets/image/codeep_icon.svg'));

    if (localStorage.getItem('current_user')) {
      router.navigate(['/home']);
    } else {
      // this.authService.authState.subscribe((user) => {
      //   if (!user) {
      //     this.signOut();
      //   }
      // });
    }
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
    // this.authService.authState.subscribe((user) => {
    //   if (user) {
    //     localStorage.setItem('current_user', JSON.stringify(user));
    //     this.router.navigate(['/home']);
    //   }
    // });
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  changePassType() {
    if (this.signInForm.value.password) {
      this.isTextFieldType = !this.isTextFieldType;
    } else {
      this.isTextFieldType = true;
    }
  }

  valuechange(event) {
    if (!event.target.value) {
      this.isTextFieldType = true;
    }
  }

  onSignIn() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (this.signInForm.valid) {
      const user = {
        email: this.signInForm.get('email').value.toLowerCase(),
        password: this.signInForm.get('password').value
      };
      const usr = users.find(us => us.email === user.email && us.password === user.password);
      if (usr) {
        localStorage.setItem('current_user', JSON.stringify(user));
        this.router.navigate(['/home']);
      } else {
        alert('Invalid email or password!');
      }
    }
  }

  signInWithGoogle(): void {
    console.log('Set Yours Google-OAuth-Client-Id');
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    console.log('Set Yours Facebook-OAuth-Client-Id');
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithLinkedIN(): void {
    console.log('Set Yours Linkedin-OAuth-Client-Id');
    // this.authService.signIn(LinkedinLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    // this.authService.signOut();
  }
}
