import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import  {ValidateService} from '../../services/validate.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router} from "@angular/router";

@Component({
  selector: 'app-check-leaves',
  templateUrl: './check-leaves.component.html',
  styleUrls: ['./check-leaves.component.css']
})
export class CheckLeavesComponent implements OnInit {
  leaveDate: string;
  status : string;
  leavers : object;
  ownerId : string;
  user : object;


  constructor(private authService : AuthService,
              private validateService: ValidateService,
              private flashMessage: NgFlashMessageService,
              private router: Router) { }

  ngOnInit() {
  }

  adminDecision(ownerId, leaveDate){
    this.ownerId = ownerId;
    this.leaveDate = leaveDate;
    const leaver = {
      ownerId: this.ownerId,
      leaveDate : this.leaveDate
    };
    this.router.navigate(['action',leaver]);
    this.authService.checkLeaver(leaver).subscribe(data => {
      if (data.success) {
        this.user = data.leavers;
        this.leaveDate = data.leaveDate;
      }else {
        this.flashMessage.showFlashMessage({
          messages: [data.msg],
          timeout: 5000,
          type: 'danger'
        });
        this.router.navigate(['checkLeaves']);
      }
    });

  }

  onCheckLeavesSubmit(){

    const leave = {
      leaveDate: this.leaveDate,
      status : this.status
    };

    if (!this.validateService.validateLeaveDate(leave)) {

      this.flashMessage.showFlashMessage({
        messages: ["Please Select A Date"],
        timeout: 3000,
        type: 'danger'
      });
      return false;
    }

    if (!this.validateService.validateStatus(leave)) {

      this.flashMessage.showFlashMessage({
        messages: ["Please Select A Date"],
        timeout: 3000,
        type: 'danger'
      });
      return false;
    }


    this.authService.checkLeaves(leave).subscribe(data => {
      if (data.success) {
        this.leavers = data.leavers;
        this.leaveDate = data.leaveDate;
      }else {
        this.flashMessage.showFlashMessage({
          messages: [data.msg],
          timeout: 5000,
          type: 'danger'
        });
        this.router.navigate(['checkLeaves']);
      }
    });

  }

}
