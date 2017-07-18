import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdSidenavModule, MdToolbarModule, MdListModule, MdIconModule } from '@angular/material';
import { AppLayoutComponent } from './layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdSidenavModule,
    MdToolbarModule,
    MdListModule,
    MdIconModule,
  ],
  declarations: [AppLayoutComponent],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
