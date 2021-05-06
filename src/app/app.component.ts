import { Component } from "@angular/core";

@Component({
  // use this selector to insert into your index
  selector: 'pm-root',
  // linked template vs inline template
  template: /*html*/`
  <nav class='navbar navbar-expand navbar-light bg-light'>
  <a class="navbar-brand">{{pageTitle}}</a>
  <ul class="nav nav-pills">
  <li><a class='nav-link' routerLink='/welcome'>Home</a></li>
  <li><a class='nav-link' routerLink='/products'>Product</a></li>
  </ul>
  </nav>
  <div class='container-fluid'>
  <router-outlet>
  </router-outlet>
  </div >

  `
  // can remove pm products because we will now be routing to that page
  // <pm-products></pm-products>
  // pm-products is a directive
  // structural directive that is built in to angular
})

export class AppComponent {
  // can put breakpoints in this to watch values as it builds
  pageTitle: string = 'Dohmen Product Management';
}