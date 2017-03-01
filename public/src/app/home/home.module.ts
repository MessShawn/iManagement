import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { LoginComponent } from './login.component.js';

import { HomeRoutingModule } from './home-routing.module.js';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    LoginComponent
  ]
})
export class HomeModule {}
