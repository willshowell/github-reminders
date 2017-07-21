import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdInputModule, MdButtonModule } from '@angular/material';
import { AppNewReminderPageComponent } from './new.component';

@NgModule({
  imports: [
    MdInputModule,
    MdButtonModule,
    ReactiveFormsModule,
  ],
  declarations: [AppNewReminderPageComponent],
  exports: [AppNewReminderPageComponent]
})
export class AppNewReminderModule { }
