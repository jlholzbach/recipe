import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("account");
    this.authService.loginChange.next(false);
  }
}
