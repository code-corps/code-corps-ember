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
