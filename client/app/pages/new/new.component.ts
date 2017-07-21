import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

const VALID_GITHUB_ISSUE = /(?:github\.com\/)?(\w+\/\w+)\/(issues|pull)\/(\d+)$/;

@Component({
  selector: 'app-new-reminder',
  styleUrls: ['new.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'app-new-reminder' },
  template: `
    <form [formGroup]="newReminderForm">
      <md-input-container>
        <input mdInput formControlName="link" placeholder="Github Issue or Pull Request">
        <md-hint>Ex. https://github.com/angular/angular/issues/1234 or angular/angular/pull/2345</md-hint>
        <md-error>A valid Github issue or pull request is required</md-error>
      </md-input-container>

      <pre>
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

  constructor(private fb: FormBuilder) {
    this.newReminderForm = this.fb.group({
      link: ['', [Validators.pattern(VALID_GITHUB_ISSUE), Validators.required]],
      trigger: '',
      reminder: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.linkControl.valueChanges
      .filter(() => this.linkControl.valid)
      .debounceTime(1000)
      .map(link => this.getApiEndpoint(link))
      .subscribe(x => console.log(x))
  }

  /** Form control for Github link */
  get linkControl(): FormControl {
    return this.newReminderForm.get('link') as FormControl;
  }

  /** Convert user input into a Github API endpoint */
  getApiEndpoint(link: string) {
    const match = VALID_GITHUB_ISSUE.exec(link);

    if (!match) {
      throw Error('Invalid link. Cannot get endpoint for' + link);
    }

    if (match[2] === 'pull') {
      match[2] = 'pulls';
    }

    return `https://api.github.com/repos/${match[1]}/${match[2]}/${+match[3]}`;
  }

}
