import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }       from './login.component.js';
import { HomeComponent }       from './home.component.js';
const homeRoutes: Routes = [
    { path: 'login', component: LoginComponent }
	, { path: 'home', component: HomeComponent }
];
@NgModule({
	imports: [
		RouterModule.forChild(homeRoutes)
	],
	exports: [
		RouterModule
	]
})
export class HomeRoutingModule { }
