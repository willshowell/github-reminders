import { NgModule } from '@angular/core';
import { MdInputModule } from '@angular/material';
import { AppNewReminderPageComponent } from './new.component';

@NgModule({
  imports: [
    MdInputModule
  ],
  declarations: [AppNewReminderPageComponent],
  exports: [AppNewReminderPageComponent]
})
export class AppNewReminderModule { }
