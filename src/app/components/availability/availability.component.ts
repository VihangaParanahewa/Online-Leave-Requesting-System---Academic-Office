import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service';
import  {ValidateService} from '../../services/validate.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router} from "@angular/router";

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  leaveDate: string;
  pending : number;
  accept : number;
  reject : number;
  max : number;

  constructor(private authService : AuthService,
              private validateService: ValidateService,
              private flashMessage: NgFlashMessageService,
              private router: Router) { }

  ngOnInit() {
  }


  onAvailabilitySubmit() {
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

    this.authService.checkAvailableLeave(leave).subscribe(data => {
      if (data.success) {
        this.leaveDate = data.leaveDate;
        this.accept = data.accept;
        this.reject = data.reject;
        this.pending = data.pending;
        this.max = 10;

      }else {
        this.flashMessage.showFlashMessage({
          messages: [data.msg],
          timeout: 5000,
          type: 'danger'
        });
        this.router.navigate(['availability']);
      }
    });


  }

}
