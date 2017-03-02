import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { LoginComponent } from './login.component.js';
import { HomeComponent } from './home.component.js';

import { HomeRoutingModule } from './home-routing.module.js';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    HomeRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    LoginComponent,
    HomeComponent
  ]
})
export class HomeModule {}
