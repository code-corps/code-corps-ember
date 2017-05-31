import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import animatedHighFiveComponent from 'code-corps-ember/tests/pages/components/animated-high-five';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(animatedHighFiveComponent);

moduleForComponent('animated-high-five', 'Integration | Component | animated high five', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it changes the initial and follow on animation classes when clicked', function(assert) {
  page.render(hbs`{{animated-high-five}}`);

  assert.ok(page.isInitialAnimation);
  assert.notOk(page.isFollowOnAnimation);

  page.click();

  assert.notOk(page.isInitialAnimation);
  assert.ok(page.isFollowOnAnimation);
});
