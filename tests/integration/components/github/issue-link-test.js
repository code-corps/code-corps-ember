import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { get, set } from '@ember/object';
import { run } from '@ember/runloop';
import component from 'code-corps-ember/tests/pages/components/github/issue-link';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{github/issue-link
      githubIssue=githubIssue
      githubRepo=githubRepo
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

let githubIssue = {
  isLoaded: true,
  number: '123'
};

let githubRepo = {
  githubAccountLogin: 'code-corps',
  isLoaded: true,
  name: 'code-corps-ember'
};

test('it renders with text and no tooltip when large', function(assert) {
  assert.expect(3);

  set(this, 'githubIssue', githubIssue);
  set(this, 'githubRepo', githubRepo);
  set(this, 'size', 'large');

  renderPage();

  assert.equal(page.repoName.text, 'code-corps-ember', 'The repo name renders.');
  assert.equal(page.issueNumber.text, '#123', 'The issue number renders.');
  assert.notOk(page.isTooltipTarget, 'There is no tooltip.');
});

test('it renders with no text and a tooltip when small', function(assert) {
  assert.expect(6);

  set(this, 'githubIssue', githubIssue);
  set(this, 'githubRepo', githubRepo);
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

test('it renders with loading when large', function(assert) {
  assert.expect(1);

  set(this, 'githubIssue', { isLoaded: false });
  set(this, 'githubRepo', { isLoaded: false });
  set(this, 'size', 'large');

  renderPage();

  assert.ok(page.loadingLarge.isVisible, 'The large loading state renders.');
});

test('it renders with loading when small', function(assert) {
  assert.expect(1);

  set(this, 'githubIssue', { isLoaded: false });
  set(this, 'githubRepo', { isLoaded: false });
  set(this, 'size', 'small');

  renderPage();

  assert.ok(page.loadingSmall.isVisible, 'The small loading state renders.');
});

test('it tracks clicking the link', function(assert) {
  assert.expect(1);

  let mockMetrics = {
    trackEvent(properties) {
      let event = get(properties, 'event');
      assert.equal(event, 'Clicked GitHub Link for Task');
    }
  };
  stubService(this, 'metrics', mockMetrics);

  set(this, 'githubIssue', githubIssue);
  set(this, 'githubRepo', githubRepo);

  renderPage();

  page.url.click();
});
