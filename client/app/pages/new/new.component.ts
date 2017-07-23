import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GithubService, ApiIssue } from '../../core';
import { Issue } from '../../shared/issue';

const VALID_GITHUB_ISSUE = /(?:github\.com\/)?(\w+\/\w+)\/(issues|pull)\/(\d+)$/;

@Component({
  selector: 'app-new-reminder',
  styleUrls: ['new.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'app-new-reminder' },
  template: `
    <form [formGroup]="newReminderForm">
      <!-- Issue input -->
      <md-input-container>
        <input mdInput formControlName="link" placeholder="GitHub Issue or Pull Request">
        <md-hint>Ex. https://github.com/angular/angular/issues/1234 or angular/angular/pull/2345</md-hint>
        <md-error>A valid GitHub issue or pull request is required</md-error>
      </md-input-container>

      <!-- Preview -->
      <div class="app-new-reminder-issue">
        <app-issue
          [class.show]="showResource"
          [issue]="resource$ | async">
        </app-issue>
        <md-spinner *ngIf="resourceLoading"></md-spinner>
      </div>

      <!-- Option select -->
      <pre *ngIf="false">
      Remind me when:
        issue
          - is closed
          - is assigned

        pull request
          - is closed (closed && merge == false)
          - is merged
          - has conflict
          - is merged and a release is made
      </pre>

      <!-- Reminder input -->
      <md-input-container>
        <textarea mdInput mdTextareaAutosize formControlName="reminder" placeholder="Reminder"></textarea>
        <md-hint>What would you like to be reminded to do?</md-hint>
        <md-error>This is the whole point of the app... Don't leave it blank!</md-error>
      </md-input-container>

      <button md-raised-button color="accent" class="app-new-reminder-save" type="submit">Save</button>
    </form>


  `
})
export class AppNewReminderPageComponent implements OnInit {

  /** Form group bound to the html form */
  newReminderForm: FormGroup;

  /** Whether current resource should be shown */
  showResource = false;

  /** Whether current resource is loading */
  resourceLoading = false;

  /** Current resource from api */
  resource$: Observable<Issue>;

  constructor(
    private fb: FormBuilder,
    private githubService: GithubService
  ) {
    this.newReminderForm = this.fb.group({
      link: ['', [Validators.pattern(VALID_GITHUB_ISSUE), Validators.required]],
      trigger: '',
      reminder: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.resource$ = this.linkControl.valueChanges
      .filter(() => this.linkControl.valid)
      .debounceTime(1000)
      .distinctUntilChanged()
      .do(() => {
        this.resourceLoading = true;
        this.showResource = false;
      })
      .map(link => this.getApiEndpoint(link))
      .switchMap(endpoint => this.githubService.getIssue(endpoint))
      .map(issue => this.convertToNormalizedIssue(issue))
      .do(() => {
        this.resourceLoading = false;
        this.showResource = true;
      });
  }

  /** Form control for GitHub link */
  get linkControl(): FormControl {
    return this.newReminderForm.get('link') as FormControl;
  }

  /** Convert user input into a GitHub API endpoint */
  private getApiEndpoint(link: string) {
    const match = VALID_GITHUB_ISSUE.exec(link);

    if (!match) {
      throw Error('Invalid link. Cannot get endpoint for' + link);
    }

    if (match[2] === 'pull') {
      match[2] = 'pulls';
    }

    return `https://api.github.com/repos/${match[1]}/${match[2]}/${+match[3]}`;
  }

  /** Convert an API issue to a reduced issue for displaying */
  private convertToNormalizedIssue(ghIssue: ApiIssue): Issue {
    const data = ghIssue.data;
    const issue: Issue = {
      type: ghIssue.type,
      state: data.state,
      title: data.title,
      number: data.number,
      htmlUrl: data.html_url,
      username: data.user.login,
      userUrl: data.user.html_url,
      assigned: !!data.assignee
    };

    if (issue.type === 'pr') {
      issue.merged = data.merged;
      issue.mergeable = data.mergeable;
    }

    return issue;
  }

}
