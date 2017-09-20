import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/user/display-username';

let page = PageObject.create(component);

moduleForComponent('user/display-username', 'Integration | Component | user/display username', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders only the username if present', function(assert) {
  assert.expect(3);

  let user = {
    githubUsername: null,
    username: 'test-user'
  };

  this.set('user', user);

  page.render(hbs`{{user/display-username user=user}}`);

  assert.ok(page.username.isVisible);
  assert.notOk(page.githubUsername.isVisible);
  assert.equal(page.username.text.trim(), 'test-user');
});

test('it renders only the username regardless of whether both are present', function(assert) {
  assert.expect(3);

  let user = {
    githubUsername: 'github-test-user',
    username: 'test-user'
  };

  this.set('user', user);

  page.render(hbs`{{user/display-username user=user}}`);

  assert.ok(page.username.isVisible);
  assert.notOk(page.githubUsername.isVisible);
  assert.equal(page.username.text.trim(), 'test-user');
});

test('it renders only the github username if only it is present', function(assert) {
  assert.expect(4);

  let user = {
    githubUsername: 'github-test-user',
    username: null
  };

  this.set('user', user);

  page.render(hbs`{{user/display-username user=user}}`);

  assert.notOk(page.username.isVisible);
  assert.ok(page.githubUsername.isVisible);
  assert.equal(page.githubUsername.text.trim(), 'github-test-user');
  assert.equal(page.text.trim(), 'GitHub user github-test-user');
});
