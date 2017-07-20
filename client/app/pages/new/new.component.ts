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
      Set trigger:
        Issues
          - Closed
          - Assigned

        Pull Request
          - Closed (closed && merge == false)
          - Merged
          - Has conflict
          - Merged and subsequent release
    </pre>
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
