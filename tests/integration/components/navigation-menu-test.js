import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

moduleForComponent('navigation-menu', 'Integration | Component | navigation menu', {
  integration: true
});

test('it renders elements for the default menu when logged out', function(assert) {
  this.render(hbs`{{navigation-menu}}`);

  assert.equal(this.$('.site-logo').length, 1);
  assert.equal(this.$('.main-nav').length, 1);
  assert.equal(this.$('.auth-nav').length, 1);
  assert.equal(this.$('.user-menu-tab').length, 0);
  assert.equal(this.$('.onboarding-steps').length, 0);
});

test('it renders elements for the default menu when logged in', function(assert) {
  stubService(this, 'session', { isAuthenticated: true });

  this.render(hbs`{{navigation-menu}}`);

  assert.equal(this.$('.site-logo').length, 1);
  assert.equal(this.$('.main-nav').length, 1);
  assert.equal(this.$('.auth-nav').length, 0);
  assert.equal(this.$('.user-menu-tab').length, 1);
  assert.equal(this.$('.onboarding-steps').length, 0);
});

test('it renders elements for the onboarding menu', function(assert) {
  stubService(this, 'navigation-menu', { isOnboarding: true });
  stubService(this, 'onboarding', {
    currentStepNumber  : 1,
    totalSteps         : 3,
    progressPercentage : 100
  });

  this.render(hbs`{{navigation-menu}}`);

  assert.equal(this.$('.site-logo').length, 1);
  assert.equal(this.$('.main-nav').length, 0);
  assert.equal(this.$('.auth-nav').length, 0);
  assert.equal(this.$('.user-menu-tab').length, 0);
  assert.equal(this.$('.onboarding-steps').length, 1);
  assert.equal(this.$('.onboarding-steps p').text().trim(), 'Step 1 of 3');
  assert.equal(this.$('.progress-bar').attr('style'), 'width: 100%;');
});
