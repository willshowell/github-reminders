import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Issue } from './issue.model';

@Component({
  selector: 'app-issue',
  styleUrls: ['issue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'app-issue' },
  template: `
  <ng-container *ngIf="issue">
    <div class="app-issue-state">
      {{ issue.state }}
    </div>
    <div class="app-issue-text">
      <a [href]="issue.htmlUrl" class="app-issue-title">
        {{ issue.title }}
      </a>
      <div class="app-issue-details">
        #{{ issue.number }} by <a [href]="issue.userUrl">{{ issue.username}}</a>
      </div>
    </div>
  </ng-container>
  `
})
export class IssueComponent {

  /** Issue to display */
  @Input() issue: Issue;

}
