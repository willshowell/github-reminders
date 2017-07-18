import { Route } from '@angular/router';
import { AppHomePageComponent } from './pages/home/home.component';

export const routes: Route[] = [
  { path: '', component: AppHomePageComponent, pathMatch: 'full' }
];
