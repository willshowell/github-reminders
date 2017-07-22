import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import { MdSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

const SIDENAV_BREAKPOINT = 940;

interface NavItem {
  route: string | string[];
  text: string;
  icon: string;
}

@Component({
  selector: 'app-layout',
  host: { 'class': 'app-layout' },
  styleUrls: ['layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <md-toolbar color="primary">
      <button md-icon-button
        class="app-layout-emoji"
        (click)="toggleSidenav()">
        🐙
      </button>
      Github Reminders
    </md-toolbar>

    <div class="app-layout-wrapper">
      <md-sidenav-container>
        <md-sidenav class="app-sidenav"
          [opened]="screenIsWide$ | async"
          [mode]="sidenavMode$ | async">
          <md-nav-list class="fill-remaining-space">
            <a md-list-item [routerLink]="link.route" *ngFor="let link of links"  (click)="navigationClick$.next()">
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
export class AppLayoutComponent implements OnInit {

  /** Reference to the sidenav */
  @ViewChild(MdSidenav) sidenav: MdSidenav;

  /** Stream of whether the the screen is wide */
  screenIsWide$: Observable<boolean>;

  /** Stream of current sidenav mode */
  sidenavMode$: Observable<'side'|'over'>;

  /** List of nav items to show in the sidenav */
  links: NavItem[] = [
    { route: 'new', text: 'Create a new Reminder', icon: 'add_circle_outline' },
    { route: 'reminders', text: 'Reminders', icon: 'list' },
  ];

  /** Stream of click events on nav items */
  private navigationClick$ = new Subject<void>();

  ngOnInit() {
    // Handle sidenav behavior
    this.screenIsWide$ = Observable
    .fromEvent(window, 'resize')
    .sampleTime(100)
    .startWith(null)
    .map(() => this.screenIsWide)
    .distinctUntilChanged()
    .shareReplay(1);

    // Set mode of sidenav based on screen width
    this.sidenavMode$ = this.screenIsWide$.map(x => x ? 'side' : 'over');

    // Close the sidenav when nav clicks occur in 'over' sidenav
    this.navigationClick$
      .filter(() => !this.screenIsWide)
      .subscribe(() => this.sidenav.close());
  }

  /** Toggle the sidenav state */
  toggleSidenav() {
    this.sidenav.toggle();
  }

  /** Whether the screen size exceeds the predefined breakpoint */
  private get screenIsWide(): boolean {
    return window.matchMedia(`(min-width: ${SIDENAV_BREAKPOINT}px)`).matches;
  }

}
