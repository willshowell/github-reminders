import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiIssue } from './github-issue.model';

@Injectable()
export class GithubService {

  constructor(private http: HttpClient) { }

  /** Return an issue or pr from the GitHub API */
  getIssue(url: string): Observable<ApiIssue> {
    return this.http.get(url)
      .map((result: any) => {
        const type = result.pull_request || result.merged !== undefined ? 'pr' : 'issue';

        return { type: type as ('pr' | 'issue'), data: result };
      });
  }

}
