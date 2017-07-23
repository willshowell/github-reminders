import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueComponent } from './issue.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IssueComponent
  ],
  exports: [
    IssueComponent
  ]
})
export class IssueModule { }
