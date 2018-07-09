import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }


  validateRegister(user){
    if(user.name == undefined || user.email == undefined || user.gender == undefined || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateMobile(mobile){
    var numbersList = /^[0-9]+$/;
    var checkNum = true;
    if(mobile.match(numbersList)){
      checkNum = false;
    }
    if(mobile.substring(0,2)!="07" || mobile.length!=10 || checkNum){
      return false;
    } else {
      return true;
    }
  }



  validateLeaveDate(leave){
    if(leave.leaveDate == undefined ) {
      return false;
    } else {
      return true;
    }
  }


  validateStatus(leave){
    if(leave.status == undefined ) {
      return false;
    } else {
      return true;
    }
  }
}
