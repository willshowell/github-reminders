import { GithubRemindersPage } from './app.po';

describe('github-reminders App', () => {
  let page: GithubRemindersPage;

  beforeEach(() => {
    page = new GithubRemindersPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
