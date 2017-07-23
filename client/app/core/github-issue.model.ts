/** Type aware return from GitHub api */
export interface ApiIssue {
  /** Type of the response issue */
  type: 'pr' | 'issue';

  /** Response data */
  data: any;
}
