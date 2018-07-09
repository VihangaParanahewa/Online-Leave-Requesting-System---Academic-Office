import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
//import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken : any;
  user : any;

  constructor(private http: Http) { }

  registerUser(user){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/register', user, {headers: headers})
      .pipe(map(res => res.json()));
  }


  LoginUser(user){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/login', user, {headers: headers})
      .pipe(map(res => res.json()));
  }


  getProfile(){
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:4000/profile',{headers: headers})
      .pipe(map(res => res.json()));
  }

  storeUserData(token, user){

    localStorage.setItem('id_toke', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;

  }

  storeUserRole(role){
    localStorage.setItem('userRole', role);
  }

  loadToken(){
    const token = localStorage.getItem('id_toke');
    this.authToken = token;
  }


  loggedIn(){
    this.loadToken();
    if(this.authToken){
      return true;
    } else {
      return false;
    }

  }

  adminLoggedIn(){
    if(localStorage.getItem('userRole') === 'Admin'){
      return true;
    } else {
      return false;
    }
  }


  logOut(){

    this.authToken = null;
    this.user = null;
    localStorage.clear();

  }


  getLeave(leave){
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/addLeave',leave,{headers: headers})
      .pipe(map(res => res.json()));
  }

  getLeaveHistory(){
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:4000/viewLeave',{headers: headers})
      .pipe(map(res => res.json()));
  }


  checkAvailableLeave(leave){
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/availability',leave,{headers: headers})
      .pipe(map(res => res.json()));
  }


  checkLeaves(leave){
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/checkLeaves',leave,{headers: headers})
      .pipe(map(res => res.json()));
  }

  checkLeaver(leaver){
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post( 'http://localhost:4000/checkLeaver',leaver,{headers: headers})
      .pipe(map(res => res.json()));
  }



}
