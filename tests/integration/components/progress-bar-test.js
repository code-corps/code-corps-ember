import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/progress-bar';

let page = PageObject.create(component);

moduleForComponent('progress-bar', 'Integration | Component | progress bar', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it sets the style when percentage is set', function(assert) {
  page.render(hbs`{{progress-bar percentage=100}}`);

  assert.ok(page.displaysPercentage(100));
});

test('it sets the style when no percentage is set', function(assert) {
  page.render(hbs`{{progress-bar}}`);

  assert.ok(page.displaysPercentage(0));
});
