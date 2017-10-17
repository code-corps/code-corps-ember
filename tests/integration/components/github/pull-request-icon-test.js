import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import component from 'code-corps-ember/tests/pages/components/github/pull-request-icon';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(component);

const {
  set
} = Ember;

function renderPage() {
  page.render(hbs`
    {{github/pull-request-icon
      githubPullRequest=githubPullRequest
    }}
  `);
}

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
  renderPage();
  assert.ok(page.spriteIcon.svg.hasClass('git-merge-48'), 'The svg renders a merge icon.');
  assert.ok(page.spriteIcon.svg.hasClass('solid-purple'), 'The svg renders a purple icon.');
});

test('it renders a red PR icon if pull request closed', function(assert) {
  assert.expect(2);
  set(this, 'githubPullRequest', { merged: false, state: 'closed' });
  renderPage();
  assert.ok(page.spriteIcon.svg.hasClass('pull-request-48'), 'The svg renders a PR icon.');
  assert.ok(page.spriteIcon.svg.hasClass('solid-red'), 'The svg renders a red icon.');
});

test('it renders a green PR icon if pull request open', function(assert) {
  assert.expect(2);
  set(this, 'githubPullRequest', { merged: false, state: 'open' });
  renderPage();
  assert.ok(page.spriteIcon.svg.hasClass('pull-request-48'), 'The svg renders a PR icon.');
  assert.ok(page.spriteIcon.svg.hasClass('solid-green'), 'The svg renders a green icon.');
});

test('it renders a loading icon in all other cases', function(assert) {
  assert.expect(1);
  set(this, 'githubPullRequest', null);
  renderPage();
  assert.ok(page.loadingIcon.isVisible, 'The loading icon renders.');
});
