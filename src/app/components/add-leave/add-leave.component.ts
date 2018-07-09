import { Component, OnInit } from '@angular/core';
import  {ValidateService} from '../../services/validate.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router} from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.css']
})
export class AddLeaveComponent implements OnInit {
  leaveDate: string;

  constructor(private validateService: ValidateService,
              private flashMessage: NgFlashMessageService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onLeaveSubmit() {
    const leave = {
      leaveDate: this.leaveDate
    };



    if (!this.validateService.validateLeaveDate(leave)) {

      this.flashMessage.showFlashMessage({
        messages: ["Please Select A Date"],
        timeout: 3000,
        type: 'danger'
      });
      return false;
    }

    this.authService.getLeave(leave).subscribe(data => {
      if (data.success) {
        if (data.state) {
          this.flashMessage.showFlashMessage({
            messages: [data.msg],
            timeout: 5000,
            type: 'success'
          });
        } else {
          this.flashMessage.showFlashMessage({
            messages: [data.msg],
            timeout: 5000,
            type: 'danger'
          });
        }
        this.router.navigate(['addLeave']);
      } else {
        this.flashMessage.showFlashMessage({
          messages: [data.msg],
          timeout: 5000,
          type: 'danger'
        });
        this.router.navigate(['addLeave']);
      }
    });
  }
}
