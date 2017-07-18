import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import 'hammerjs';

import { routes } from './routes';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/layout.module';
import { AppHomeModule } from './pages/home';
import { AppRemindersModule } from './pages/reminders';
import { AppNewReminderModule } from './pages/new';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),

    AppLayoutModule,
    AppHomeModule,
    AppRemindersModule,
    AppNewReminderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
