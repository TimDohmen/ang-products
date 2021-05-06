import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductModule } from './products/product.module';

@NgModule({
  // so html can find its selector
  // components must be declared in a module and are private by default
  // each component must belong to one and only one module
  // only declare components directives and pipes
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  // our local directives fomr from declarations
  // directives components and pipes from other exports go in imports
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
    ]),
    ProductModule
  ],
  exports: [],
  // can use an exports array to share declarations with other modules 
  // because they can only be declared in one

  // old way to register injectors
  // providers:[]
  // can make feature modules to make a module for products and organize the app for 
  // products to have everything they need in that one feature

  // defines startup component when app is launches, every app must bootstrap one component
  bootstrap: [AppComponent]
})
export class AppModule { }
