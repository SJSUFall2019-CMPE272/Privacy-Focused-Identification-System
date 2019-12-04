import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './../components/home/home.component';
import { LoginComponent } from './../components/login/login.component';
import { RegisterComponent } from './../components/register/register.component';
import { IssuerComponent } from './../components/issuer/issuer.component';
import { UserComponent } from './../components/user/user.component';

import { AuthGuardService } from './../services/auth-guard.service';


const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'issuer',
		component: IssuerComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'user',
		component: UserComponent,
		canActivate: [AuthGuardService]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
