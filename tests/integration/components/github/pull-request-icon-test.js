import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import component from 'code-corps-ember/tests/pages/components/github/pull-request-icon';
import PageObject from 'ember-cli-page-object';
import { set } from '@ember/object';

let page = PageObject.create(component);

moduleForComponent('github/pull-request-icon', 'Integration | Component | github/pull request icon', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders a purple merge icon if pull request merged', function(assert) {
  assert.expect(2);

  set(this, 'githubPullRequest', { merged: true });

  this.render(hbs`{{github/pull-request-icon githubPullRequest=githubPullRequest}}`);

  assert.ok(page.spriteIcon.svg.hasClass('github-merge-48'), 'The svg renders a merge icon.');
  assert.ok(page.spriteIcon.svg.hasClass('solid-purple'), 'The svg renders a purple icon.');
});

test('it renders a red PR icon if pull request closed', function(assert) {
  assert.expect(2);

  set(this, 'githubPullRequest', { merged: false, state: 'closed' });

  this.render(hbs`{{github/pull-request-icon githubPullRequest=githubPullRequest}}`);

  assert.ok(page.spriteIcon.svg.hasClass('github-pull-request-48'), 'The svg renders a PR icon.');
  assert.ok(page.spriteIcon.svg.hasClass('solid-red'), 'The svg renders a red icon.');
});

test('it renders a green PR icon if pull request open', function(assert) {
  assert.expect(2);

  set(this, 'githubPullRequest', { merged: false, state: 'open' });

  this.render(hbs`{{github/pull-request-icon githubPullRequest=githubPullRequest}}`);

  assert.ok(page.spriteIcon.svg.hasClass('github-pull-request-48'), 'The svg renders a PR icon.');
  assert.ok(page.spriteIcon.svg.hasClass('solid-green'), 'The svg renders a green icon.');
});

test('it renders a loading icon in all other cases', function(assert) {
  assert.expect(1);

  set(this, 'githubPullRequest', null);

  this.render(hbs`{{github/pull-request-icon githubPullRequest=githubPullRequest}}`);

  assert.ok(page.loadingIcon.isVisible, 'The loading icon renders.');
});
