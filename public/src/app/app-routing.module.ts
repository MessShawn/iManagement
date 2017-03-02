import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';
import { AppComponent }           from './app.component.js';

import { PageNotFoundComponent }   from './not-found.component.js';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' }
	, { path: '**', component: PageNotFoundComponent }
];
@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
