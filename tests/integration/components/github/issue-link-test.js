import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import component from 'code-corps-ember/tests/pages/components/github/issue-link';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(component);

const {
  run,
  set
} = Ember;

function renderPage() {
  page.render(hbs`
    {{github/issue-link
      githubRepo=githubRepo
      number=number
      size=size
    }}
  `);
}

moduleForComponent('github/issue-link', 'Integration | Component | github/issue link', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

let githubRepo = {
  githubAccountLogin: 'code-corps',
  name: 'code-corps-ember'
};

let number = '123';

test('it renders with text and no tooltip when large', function(assert) {
  assert.expect(3);

  set(this, 'githubRepo', githubRepo);
  set(this, 'number', number);
  set(this, 'size', 'large');

  renderPage();

  assert.equal(page.repoName.text, 'code-corps-ember', 'The repo name renders.');
  assert.equal(page.issueNumber.text, '#123', 'The issue number renders.');
  assert.notOk(page.isTooltipTarget, 'There is no tooltip.');
});

test('it renders with no text and a tooltip when small', function(assert) {
  assert.expect(6);

  set(this, 'githubRepo', githubRepo);
  set(this, 'number', number);
  set(this, 'size', 'small');

  renderPage();

  assert.notOk(page.repoName.isVisible, 'The repo name does not render.');
  assert.notOk(page.issueNumber.isVisible, 'The issue number does not render.');
  assert.ok(page.isTooltipTarget, 'There is a tooltip.');
  assert.equal(page.tooltip.text, 'code-corps/code-corps-ember #123', 'The tool tip renders with the slash notation for the repo and the issue number.');
  assert.ok(page.tooltip.isAriaHidden);

  run(() => {
    page.mouseenter();
  });

  assert.ok(page.tooltip.isAriaVisible);
});
