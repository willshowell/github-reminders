/** Normalized issue used for display purposes */
export interface Issue {
  /** Type of the issue */
  type: 'issue' | 'pr';

  /** Current state of the issue */
  state: 'open' | 'closed';

  /** Title of the issue */
  title: string;

  /** Unique identifier of the issue */
  number: number;

  /** Url to the original issue */
  htmlUrl: string;

  /** Name of the author */
  username: string;

  /** Url to the author's profile' */
  userUrl: string;

  /** Whether this issue has been assigned to 1 or more users */
  assigned: boolean;

  /** Whether the issue has been merged (PRs only) */
  merged?: boolean;

  /** Whether the issue can be merged (PRs only) */
  mergeable?: boolean;
}
