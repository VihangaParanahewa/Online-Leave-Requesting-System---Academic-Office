import { Component, OnInit } from '@angular/core';
import  {ValidateService} from '../../services/validate.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router} from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private validateService : ValidateService,
              private flashMessage: NgFlashMessageService,
              private authService : AuthService,
              private router : Router) { }

  ngOnInit() {
  }


  onLoginSubmit() {
    const userLoginDetails = {
      email: this.email,
      password: this.password,
    };


    // Validate Email
    if (!this.validateService.validateEmail(userLoginDetails.email)) {

      this.flashMessage.showFlashMessage({
        messages: ["Please use a valid email"],
        timeout: 3000,
        type: 'danger'
      });
      return false;
    }

    //login user
    this.authService.LoginUser(userLoginDetails).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.authService.storeUserRole(data.userRole);
        this.flashMessage.showFlashMessage({
          messages: ["You are Logged in"],
          timeout: 3000,
          type: 'success'
        });
        this.router.navigate(['']);
      } else {
        this.flashMessage.showFlashMessage({
          messages: [data.msg],
          timeout: 3000,
          type: 'danger'
        });
        this.router.navigate(['login']);
      }
    });




  }

}
