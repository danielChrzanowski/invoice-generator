import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routingComponents, RoutingModule } from './modules/routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
