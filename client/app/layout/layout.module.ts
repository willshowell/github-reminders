import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MdSidenavModule, MdToolbarModule } from '@angular/material';
import { AppLayoutComponent } from './layout.component';

@NgModule({
  imports: [
    RouterModule,
    MdSidenavModule,
    MdToolbarModule
  ],
  declarations: [AppLayoutComponent],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
