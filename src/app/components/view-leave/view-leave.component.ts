import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-view-leave',
  templateUrl: './view-leave.component.html',
  styleUrls: ['./view-leave.component.css']
})
export class ViewLeaveComponent implements OnInit {
  leaves : object;

  constructor(private authService : AuthService) { }

  ngOnInit() {

    this.authService.getLeaveHistory().subscribe(data =>{
        this.leaves = data.leaves;
        console.log(data.leaves);
      },
      err =>{
        console.log(err);
        return false;
      });

  }

}
