import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import unselectedItemComponent from 'code-corps-ember/tests/pages/components/unselected-item';

let page = PageObject.create(unselectedItemComponent);

function renderPage() {
  page.render(hbs`
    {{task-card/user/unselected-item task=task}}
  `);
}

moduleForComponent('task-card/user/unselected-item', 'Integration | Component | task card/user/unselected item', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('the default state when user task is loading', function(assert) {
  let task = { userTask: { isLoading: true } };
  this.set('task', task);
  renderPage();
  assert.notOk(page.isTooltipTarget, 'There is not a tooltip.');
  assert.ok(page.loadingIcon.isVisible, 'The loading icon renders.');
});

test('the default state when user task is loaded', function(assert) {
  let task = { userTask: { isLoading: false } };
  this.set('task', task);
  renderPage();
  assert.notOk(page.loadingIcon.isVisible, 'The loading icon does not render.');
  assert.notOk(page.isTooltipTarget, 'There is no tooltip because it lazy renders.');
  // assert.ok(page.tooltip.isHidden);
});

// test('when hovering', function(assert) {
//
//   renderPage();
//   assert.ok(page.isTooltipTarget, 'There is a tooltip.');
//   assert.equal(page.dropdownOpen, false, 'Dropdown is not open.'),
//   assert.equal(page.tooltip.text, 'Assign this task', 'The tooltip renders with text.');
//   page.mouseleave();// hide the tooltip
//   assert.ok(page.tooltip.isHidden);
// });
