import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import pageComponent from 'code-corps-ember/tests/pages/components/navigation-menu';

const page = PageObject.create(pageComponent);

moduleForComponent('navigation-menu', 'Integration | Component | navigation menu', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders elements for the default menu when logged out', function(assert) {
  assert.expect(9);

  this.render(hbs`{{navigation-menu}}`);

  assert.ok(page.logo.isVisible, 'The logo is rendered.');
  assert.ok(page.projectsLink.isVisible, 'The link to projects route is rendered');
  assert.ok(page.signUpLink.isVisible, 'The link to signup route is rendered');
  assert.ok(page.signInLink.isVisible, 'The link to login route is rendered');
  assert.notOk(page.conversationsLink.isVisible, 'The link to conversations is not shown');
  assert.notOk(page.userMenu.isVisible, 'User menu is not shown.');
  assert.notOk(page.onboarding.status.isVisible, 'The onboarding status text is not rendered.');
  assert.notOk(page.onboarding.progressBar.isVisible, 'The onboarding progress bar is not rendered.');
  assert.notOk(page.onboarding.finishSigningUp.isVisible, 'The link to finish signing up is not rendered.');
});

test('it renders elements for the default menu when logged in', function(assert) {
  assert.expect(9);

  stubService(this, 'session', { isAuthenticated: true });

  this.render(hbs`{{navigation-menu}}`);

  assert.ok(page.logo.isVisible, 'The logo is rendered.');
  assert.ok(page.projectsLink.isVisible, 'The link to projects route is rendered');
  assert.ok(page.conversationsLink.isVisible, 'The link to conversations route is rendered');
  assert.notOk(page.signUpLink.isVisible, 'The link to signup route is rendered');
  assert.notOk(page.signInLink.isVisible, 'The link to login route is rendered');
  assert.ok(page.userMenu.isVisible, 'User menu is shown.');
  assert.notOk(page.onboarding.status.isVisible, 'The onboarding status text is not rendered.');
  assert.notOk(page.onboarding.progressBar.isVisible, 'The onboarding progress bar is not rendered.');
  assert.notOk(page.onboarding.finishSigningUp.isVisible, 'The link to finish signing up is not rendered.');
});

test('it renders elements for the onboarding menu correctly when on onboarding route', function(assert) {
  assert.expect(11);

  stubService(this, 'navigation-menu', {
    isOnboarding: true,
    isViewingOnboarding: true
  });

  stubService(this, 'onboarding', {
    currentRouteStepNumber: 1,
    totalSteps: 4,
    progressPercentage: 25
  });

  this.render(hbs`{{navigation-menu}}`);

  assert.ok(page.logo.isVisible, 'The logo is rendered.');
  assert.notOk(page.projectsLink.isVisible, 'The link to projects route is not rendered.');

  assert.notOk(page.conversationsLink.isVisible, 'The link to conversations is not shown');
  assert.notOk(page.userMenu.isVisible, 'User menu is not shown.');
  assert.notOk(page.signUpLink.isVisible, 'The link to signup route is rendered.');
  assert.notOk(page.signInLink.isVisible, 'The link to login route is rendered.');

  assert.ok(page.onboarding.status.isVisible, 'The onboarding status text is rendered.');
  assert.equal(page.onboarding.status.text, 'Step 1 of 4', 'Correct status is rendered.');
  assert.ok(page.onboarding.progressBar.isVisible, 'The onboarding progress bar is rendered.');
  assert.ok(page.onboarding.progressBar.displaysPercentage(25), 'Correct progress percentage is rendered.');
  assert.notOk(page.onboarding.finishSigningUp.isVisible, 'The link to finish signing up is not rendered.');
});

test('it renders elements for the onboarding menu correctly when on project.thank-you route', function(assert) {
  assert.expect(9);

  stubService(this, 'navigation-menu', {
    // on project.thank-you route
    currentRouteName: 'project.thank-you',
    isOnboarding: true,
    // not on nonboarding route
    isViewingOnboarding: false
  });

  this.render(hbs`{{navigation-menu}}`);

  assert.ok(page.logo.isVisible, 'The logo is rendered.');
  assert.notOk(page.projectsLink.isVisible, 'The link to projects route is not rendered');

  assert.notOk(page.conversationsLink.isVisible, 'The link to conversations is not shown');
  assert.notOk(page.userMenu.isVisible, 'User menu is not shown.');
  assert.notOk(page.signUpLink.isVisible, 'The link to signup route is rendered');
  assert.notOk(page.signInLink.isVisible, 'The link to login route is rendered');

  assert.notOk(page.onboarding.status.isVisible, 'Onboarding status is not rendered.');
  assert.notOk(page.onboarding.progressBar.isVisible, 'Onboarding progress bar is not rendered.');
  assert.ok(page.onboarding.finishSigningUp.isVisible, 'The link to finish signing up is rendered.');
});

test('it renders the project switcher menu when the user has organizations', function(assert) {
  assert.expect(1);

  stubService(this, 'current-user', {
    user: {
      organizations: [
        {
          id: 1
        }
      ]
    }
  });
  stubService(this, 'session', { isAuthenticated: true });

  this.render(hbs`{{navigation-menu}}`);

  assert.ok(page.projectSwitcher.isVisible, 'The project switcher is rendered.');
});

test('it does not render the project switcher menu when the user has no organizations', function(assert) {
  assert.expect(1);

  stubService(this, 'current-user', {
    user: {
      organizations: []
    }
  });
  stubService(this, 'session', { isAuthenticated: true });

  this.render(hbs`{{navigation-menu}}`);

  assert.notOk(page.projectSwitcher.isVisible, 'The project switcher is not rendered.');
});
