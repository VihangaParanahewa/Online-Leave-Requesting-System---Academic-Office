import { Component, OnInit } from '@angular/core';
import  {ValidateService} from '../../services/validate.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router} from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  constructor(private validateService: ValidateService,
              private flashMessage: NgFlashMessageService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {

  }

  adminDecision(){

  }
}
