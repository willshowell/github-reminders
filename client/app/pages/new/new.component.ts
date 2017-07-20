import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-new-reminder',
  styleUrls: ['new.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'app-new-reminder' },
  template: `
    <md-input-container>
      <input mdInput #link placeholder="Github Issue or Pull Request" (blur)="validateLink(link.value)">
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
      <textarea mdInput mdTextareaAutosize placeholder="Reminder"></textarea>
    </md-input-container>

  `
})
export class AppNewReminderPageComponent {

  /** Currently selected route, driven by link input */
  selectedApiRoute: string;

  validateLink(val: string) {
    const validGithubLink = /(?:github\.com\/)?(\w+\/\w+)\/(issues|pull)\/(\d+)$/;
    const match = validGithubLink.exec(val);

    if (match) {
      if (match[2] === 'pull') {
        match[2] = 'pulls';
      }

      this.selectedApiRoute = `https://api.github.com/repos/${match[1]}/${match[2]}/${+match[3]}`;
    } else {

    }

  }

}
