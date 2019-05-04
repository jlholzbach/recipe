import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  displayError = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.loginFailure.subscribe(data => {
      if (data == false) {
          this.displayError = false;
      }

      else {
        this.displayError = true;
      }
    });
  }

  onSignIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signInUser(email, password);
  }
}
