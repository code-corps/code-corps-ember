import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/progress-bar-container';

let page = PageObject.create(component);

moduleForComponent('progress-bar-container', 'Integration | Component | progress bar container', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it propagates the right width', function(assert) {
  page.render(hbs`{{progress-bar-container percentage=100}}`);

  assert.ok(page.progressBar.displaysPercentage(100));
});

test('it renders as animated', function(assert) {
  page.render(hbs`{{progress-bar-container animated=true}}`);

  assert.ok(page.progressBar.isAnimated);
});

test('it renders without error by default', function(assert) {
  page.render(hbs`{{progress-bar-container}}`);

  assert.notOk(page.progressBar.hasError);
});

test('it renders with error when passed in', function(assert) {
  page.render(hbs`{{progress-bar-container error=true}}`);

  assert.ok(page.progressBar.hasError);
});
