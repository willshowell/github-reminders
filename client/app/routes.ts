import { Route } from '@angular/router';
import { AppHomePageComponent } from './pages/home';
import { AppRemindersPageComponent } from './pages/reminders';
import { AppNewReminderPageComponent } from './pages/new';

export const routes: Route[] = [
  { path: '', component: AppHomePageComponent, pathMatch: 'full' },
  { path: 'reminders', component: AppRemindersPageComponent },
  { path: 'new', component: AppNewReminderPageComponent }
];
