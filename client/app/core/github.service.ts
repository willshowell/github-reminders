import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GithubService {

  constructor(private http: HttpClient) { }

  getIssue(url: string): Observable<any> {
    return this.http.get(url)
      .map((result: any) => {
        let type = 'issue';
        if (result.pull_request || result.merged !== undefined) {
          type = 'pr';
        }
        return { type: type, data: result };
      });
  }

}
