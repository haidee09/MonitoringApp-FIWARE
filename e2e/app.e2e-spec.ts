import { AppMonitoreoPage } from './app.po';

describe('app-monitoreo App', () => {
  let page: AppMonitoreoPage;

  beforeEach(() => {
    page = new AppMonitoreoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
