import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }  from './app.component.js';
import { PageNotFoundComponent }   from './not-found.component.js';
import { AppRoutingModule } from './app-routing.module.js';
import { HomeModule }     from './home/home.module.js';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HomeModule,
    AppRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
