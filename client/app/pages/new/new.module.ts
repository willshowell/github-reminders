import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdInputModule, MdButtonModule } from '@angular/material';
import { AppNewReminderPageComponent } from './new.component';

@NgModule({
  imports: [
    CommonModule,
    MdInputModule,
    MdButtonModule,
    ReactiveFormsModule,
  ],
  declarations: [AppNewReminderPageComponent],
  exports: [AppNewReminderPageComponent]
})
export class AppNewReminderModule { }
