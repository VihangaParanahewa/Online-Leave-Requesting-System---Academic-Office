import { Component, OnInit } from '@angular/core';
import  {ValidateService} from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router} from "@angular/router"

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  mobile: string;

  constructor(private validateService : ValidateService,
              private flashMessage: NgFlashMessageService,
              private authService : AuthService,
              private router : Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      gender: this.gender,
      mobile: this.mobile
    };

    // Required Fields
    if (!this.validateService.validateRegister(user)) {

      this.flashMessage.showFlashMessage({
        messages: ["Please fill in all fields"],
        timeout: 3000,
        type: 'danger'
      });
      return false;
    }

// Validate Email
    if (!this.validateService.validateEmail(user.email)) {

      this.flashMessage.showFlashMessage({
        messages: ["Please use a valid email"],
        timeout: 3000,
        type: 'danger'
      });
      return false;
    }

    //Validate mobile number
    if(!this.validateService.validateMobile(user.mobile)){

      this.flashMessage.showFlashMessage({
        messages: ["Please Enter valid Mobile Number"],
        timeout: 3000,
        type: 'danger'
      });
      return false;
    }

    //register user
    this.authService.registerUser(user).subscribe(res =>{
      this.flashMessage.showFlashMessage({
        messages: ["You are now registered and can now login"],
        timeout: 3000,
        type: 'success'
      });
      this.router.navigate(['/login']);
    }, error =>  {
      this.flashMessage.showFlashMessage({
        messages: ["Something went wrong"],
        timeout: 3000,
        type: 'danger'
      });
      this.router.navigate(['/register']);
    });
  }
}
