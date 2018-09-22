import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  id: string = '';

  accountCreate = new Subject<boolean>();
  loginFailure = new Subject<boolean>();
  loginChange = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router){ }

  signUpUser(firstName: string, lastName: string, email: string, password: string) {
    this.http.get('http://www.joshuaholzbach.com/recipeService/createAccount.php', {
      params: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }
    }).subscribe(
      (id:string) => {
        if (id != 'exists') {
          this.id = id;
          this.accountCreate.next(true);
          this.router.navigate(['/recipes']);
        }

        else {
          this.accountCreate.next(false);
        }
      }
    )
  }

  signInUser(email: string, password: string) {
    this.http.get('http://www.joshuaholzbach.com/recipeService/getAccount.php', {
      params: {
        email: email,
        password: password
      }
    }).subscribe(
      (id:string) => {
        console.log(id);
        if (id != 'failure') {
          this.id = id;
          this.loginFailure.next(false);
          this.loginChange.next(true);
          this.router.navigate(['/recipes']);
        }

        else {
          this.loginFailure.next(true);
        }
      }
    )
  }
}
