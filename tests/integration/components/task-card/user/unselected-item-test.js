import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import {
  assertTooltipRendered,
  triggerTooltipTargetEvent
} from 'code-corps-ember/tests/helpers/ember-tooltips';
import unselectedItem from 'code-corps-ember/tests/pages/components/task-card/user/unselected-item';

let page = PageObject.create(unselectedItem);

function renderPage() {
  page.render(hbs`
    {{task-card/user/unselected-item
      task=task
      select-inline__unselected-item__icon= 'has-assign-tooltip'}}

     {{tooltip-on-element}}
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
});

// Tooltip won't be rendered in the DOM yet because enableLazyRendering delays the rendering until the user interacts with the target.

test('mouseEnter enters', function(assert) {
  renderPage();
  triggerTooltipTargetEvent($(this), 'mouseenter');
  assertTooltipRendered(assert);
});

test('mouseLeave leaves', function(assert) {
  assert.expect(1);
  let mouseLeave = function() {
    this.triggerAction({
      action: 'mouseLeave',
      target: this.get('tooltipShown')
    });

    renderPage();
    triggerTooltipTargetEvent($(this), 'mouseenter');
    mouseLeave();
    assert.equal(page.tooltipShown, 'false', 'there is no tooltip');
  };
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
