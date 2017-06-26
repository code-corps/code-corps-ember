import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import Test from 'ember-simple-auth/authenticators/test';
import setupSession from 'ember-simple-auth/initializers/setup-session';
import setupSessionService from 'ember-simple-auth/initializers/setup-session-service';

import pageComponent from 'code-corps-ember/tests/pages/components/github-connect-state';
import PageObject from 'ember-cli-page-object';

import Ember from 'ember';

const { set } = Ember;

let page = PageObject.create(pageComponent);

moduleForComponent('github-connect-state', 'Integration | Component | github connect state', {
  integration: true,
  beforeEach() {
    this.register('authenticator:test', Test);
    setupSession(this.registry);
    setupSessionService(this.registry);
    page.setContext(this);
  }
});

function renderPage() {
  page.render(hbs`{{github-connect-state githubId=githubId githubAvatarUrl=githubAvatarUrl}}`);
}

test('it renders github user info if user is connected', function(assert) {
  assert.expect(2);

  set(this, 'githubId', 'foo');
  renderPage();

  assert.ok(page.githubUserInfo.isVisible, 'Github user info is rendered.');
  assert.notOk(page.githubConnect.isVisible, 'Github connect component is not rendered.');
});

test('it renders github connect component if user is not connected', function(assert) {
  assert.expect(2);

  set(this, 'githubId', null);
  renderPage();

  assert.notOk(page.githubUserInfo.isVisible, 'Github user info is not rendered.');
  assert.ok(page.githubConnect.isVisible, 'Github connect component is rendered.');
});

test('it renders github resized github avatar url if user is connected', function(assert) {
  assert.expect(1);

  set(this, 'githubId', 'foo');
  set(this, 'githubAvatarUrl', 'bar');
  renderPage();

  assert.equal(page.githubUserInfo.avatar.url, 'bar&size=100', 'Resized avatar url is rendered.');
});
