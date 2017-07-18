import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <md-sidenav-container>
      <md-sidenav #sidenav [opened]="true" mode="side">
        Wilkommen!
      </md-sidenav>

      <md-toolbar color="primary">Github Reminders 🐙</md-toolbar>
      <router-outlet></router-outlet>

    </md-sidenav-container>
  `
})
export class AppLayoutComponent {

}
