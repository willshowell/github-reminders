import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import 'hammerjs';

import { routes } from './routes';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/layout.module';
import { AppHomeModule } from './pages/home/home.module';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
