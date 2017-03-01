import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';
import { AppComponent }           from './app.component.js';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }
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
