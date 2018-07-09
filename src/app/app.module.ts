import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from "@angular/router";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';

import { ValidateService } from './services/validate.service';
import { AuthGuard} from "./guards/auth.guard";
import { AuthService} from "./services/auth.service";
import { NgFlashMessagesModule } from 'ng-flash-messages';

import { ProfileComponent } from './components/profile/profile.component';
import { AddLeaveComponent } from './components/add-leave/add-leave.component';
import { ViewLeaveComponent } from './components/view-leave/view-leave.component';
import { AvailabilityComponent } from './components/availability/availability.component';
import { CheckLeavesComponent } from './components/check-leaves/check-leaves.component';
import { ActionComponent } from './components/action/action.component';


const appRoutes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'register', component : RegistrationComponent},
  {path: 'login', component : LoginComponent},
  {path: 'profile', component : ProfileComponent, canActivate :[ AuthGuard ]},
  {path: 'addLeave', component : AddLeaveComponent, canActivate :[ AuthGuard ]},
  {path: 'viewLeave', component : ViewLeaveComponent, canActivate :[ AuthGuard ]},
  {path: 'availability', component : AvailabilityComponent, canActivate :[ AuthGuard ]},
  {path: 'checkLeaves', component : CheckLeavesComponent, canActivate :[ AuthGuard ]},
  {path: 'action', component : ActionComponent, canActivate :[ AuthGuard ]},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    ProfileComponent,
    AddLeaveComponent,
    ViewLeaveComponent,
    AvailabilityComponent,
    CheckLeavesComponent,
    ActionComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgFlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
