import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  displayError = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.loginFailure.subscribe(data => {
      if (data == false) {
          this.displayError = true;
      }

      else {
        this.displayError = false;
      }
    });
  }

  onSignUp(form: NgForm) {
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signUpUser(firstName, lastName, email, password);
  }
}
