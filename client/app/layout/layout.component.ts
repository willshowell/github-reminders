import { Component, ViewEncapsulation } from '@angular/core';


interface NavItem {
  route: string | string[];
  text: string;
  icon: string;
}

@Component({
  selector: 'app-layout',
  host: { 'class': 'app-layout' },
  styleUrls: ['layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <md-toolbar color="primary">Github Reminders 🐙</md-toolbar>

    <div class="app-layout-wrapper">
      <md-sidenav-container>
        <md-sidenav class="app-sidenav" #sidenav [opened]="true" mode="side">
          <md-nav-list class="fill-remaining-space">
            <a md-list-item [routerLink]="link.route" *ngFor="let link of links">
              <md-icon md-list-icon>{{ link.icon }}</md-icon>
              <p md-line>{{ link.text }}</p>
            </a>
          </md-nav-list>
          <p class="app-layout-plug">Made by <a href="https://github.com/willshowell">Will</a></p>
        </md-sidenav>

        <div class="app-layout-content">
          <ng-content></ng-content>
        </div>
      </md-sidenav-container>
    </div>
  `
})
export class AppLayoutComponent {

  /** List of nav items to show in the sidenav */
  links: NavItem[] = [
    { route: 'new', text: 'Create a new Reminder', icon: 'add_circle_outline' },
    { route: 'reminders', text: 'Reminders', icon: 'list' },
  ];

}
